'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Input } from '@/app/components/Input';
import CtaButton from '@/app/components/CtaButton';
import { Order } from '@/types/declarations';
import { LoaderCircle, LogOut, SquareCheckBig, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const role = useAuth().user?.role;
  const [user, setUser] = useState<{
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    email_confirmed_at?: string | null;
  } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError || !session) {
        router.push('/auth/login');
        return;
      }

      try {
        // Get combined auth and profile data
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();
        const { data: profileData } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', authUser?.id)
          .single();

        if (authUser) {
          setUser({
            id: authUser.id,
            email: authUser.email || '',
            last_name: profileData?.last_name || '',
            first_name: profileData?.first_name || '',
            email_confirmed_at: authUser.email_confirmed_at,
          });
        }

        // Get user orders
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        setOrders(ordersData || []);
      } catch (error) {
        console.error('Data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      // Update auth metadata first
      const { error: authError } = await supabase.auth.updateUser({
        email: user.email,
      });

      if (authError) throw authError;

      // Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ first_name: user.first_name, last_name: user.last_name })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Refresh local state
      const {
        data: { user: freshUser },
      } = await supabase.auth.getUser();
      setUser((prev) => ({
        ...prev!,
        first_name: freshUser?.user_metadata.first_name,
        last_name: freshUser?.user_metadata.last_name,
        email_confirmed_at: freshUser?.email_confirmed_at,
      }));

      setEditMode(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Update failed';
      setError(errorMessage);
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <section className="container py-12">
        <h2 className="uppercase mb-8">Loading Account Details...</h2>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <h2 className="uppercase">My Account</h2>

      <hr className="border-foreground-faded mb-8" />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Account Details */}
        <div className="space-y-6">
          <div className="border-b border-foreground-faded pb-6">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="uppercase text-sm font-medium">Account Details</h3>
              <p className="italic">({role})</p>
            </div>

            <div className="space-y-4">
              <div className="w-full flex flex-col md:flex-row gap-2">
                <Input
                  label="First Name"
                  value={user?.first_name || ''}
                  onChange={(e) =>
                    setUser({ ...user!, first_name: e.target.value })
                  }
                  disabled={!editMode}
                />
                <Input
                  label="Last Name"
                  value={user?.last_name || ''}
                  onChange={(e) =>
                    setUser({ ...user!, last_name: e.target.value })
                  }
                  disabled={!editMode}
                />
              </div>

              <div className="space-y-2">
                <Input
                  label="Email"
                  type="email"
                  value={user?.email || ''}
                  onChange={(e) => setUser({ ...user!, email: e.target.value })}
                  disabled={!editMode}
                />
                {user?.email_confirmed_at ? (
                  <p className="text-xs text-green-600">Email verified</p>
                ) : (
                  <p className="text-xs text-yellow-600">
                    Check your inbox to verify email
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              {editMode ? (
                <>
                  <CtaButton
                    label="Cancel"
                    hideIcon
                    icon={<X size={16} />}
                    onClick={() => setEditMode(false)}
                    disabled={loading}
                    secondary
                  />
                  <CtaButton
                    label={loading ? 'Saving...' : 'Save Changes'}
                    hideIcon
                    icon={
                      loading ? (
                        <LoaderCircle size={16} className="animate-spin" />
                      ) : (
                        <SquareCheckBig size={16} />
                      )
                    }
                    onClick={handleUpdateProfile}
                    disabled={loading}
                  />
                </>
              ) : (
                <CtaButton
                  label="Edit Profile"
                  onClick={() => setEditMode(true)}
                  secondary
                />
              )}
            </div>
          </div>
        </div>

        <div className="order-history border-b border-foreground-faded pb-6">
          <h3 className="uppercase text-sm font-medium mb-4">Order History</h3>

          {orders.length === 0 ? (
            <p className="text-foreground-light">No orders found</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-foreground-faded p-4 hover:border-foreground transition-all duration-300">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">#{order.id.slice(0, 8)}</span>
                    <span>Ksh {order.total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-foreground-light">
                    <span>
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span
                      className={`capitalize ${
                        order.status === 'completed'
                          ? 'text-green-500'
                          : 'text-yellow-500'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CtaButton
        label="Sign Out"
        hideIcon
        icon={<LogOut size={16} />}
        onClick={handleSignOut}
        secondary
        className="mt-8 w-fit md:w-fit"
      />
    </section>
  );
}
