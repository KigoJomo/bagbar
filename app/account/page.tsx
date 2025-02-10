// app/account/page.tsx

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Input } from '@/app/components/Input';
import CtaButton from '@/app/components/CtaButton';
import { Order, OrderItem, Product } from '@/types/declarations';
import { LoaderCircle, LogOut, SquareCheckBig, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getOrderItems, getUserOrders } from '@/lib/supabase/queries';
import Image from 'next/image';

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
      try {
        const {
          data: { session },
          error: authError,
        } = await supabase.auth.getSession();

        if (authError || !session) {
          router.push('/auth/login');
          return;
        }

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
          // Use authUser directly rather than waiting for user state to update
          const currentUser = {
            id: authUser.id,
            email: authUser.email || '',
            last_name: profileData?.last_name || '',
            first_name: profileData?.first_name || '',
            email_confirmed_at: authUser.email_confirmed_at,
          };
          setUser(currentUser);

          // Fetch orders using authUser.id
          const ordersData = await getUserOrders(authUser.id);

          const ordersWithItems = await Promise.all(
            ordersData.map(async (order) => {
              // Attach the order items (which now include product details)
              const orderItems = await getOrderItems(order.id);
              // Use consistent naming: if your type uses order_items, then:
              return { ...order, order_items: orderItems };
            })
          );

          setOrders(ordersWithItems);
        }
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
    <section className="flex flex-col gap-8">
      <h2 className="uppercase">My Account</h2>

      <hr className="border-foreground-faded m-0" />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:px-24">
        <details
          id="order-history"
          className="order-history border-b border-foreground-faded pb-2 flex flex-col gap-4">
          <summary className="uppercase text-lg text-accent font-medium">
            Order History
          </summary>

          {orders.length === 0 ? (
            <p className="text-foreground-light">No orders found</p>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-foreground-faded flex flex-col gap-2 transition-all duration-300">
                  <div className="flex justify-between">
                    <span className="font-bold">#{order.id?.slice(0, 8)}</span>
                    <span>Ksh {order.total.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-light">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : ''}
                    </span>
                    <span
                      className={`capitalize ${
                        order.status === 'completed'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Display order items/products under each order */}
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="border-t border-foreground-faded pl-8">
                      {order.order_items.map(
                        (item: OrderItem & { product?: Product }) => (
                          <div
                            key={item.id}
                            className="py-4 flex items-center gap-4">
                            {item.product &&
                              item.product.images &&
                              item.product.images[0] && (
                                <Image
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-12 h-12 object-cover"
                                  width={250}
                                  height={250}
                                />
                              )}
                            <div>
                              <p className="text-sm font-medium">
                                {item.product
                                  ? item.product.name
                                  : item.product_id}
                              </p>
                              <p className="text-xs">
                                Quantity: {item.quantity} | Price: Ksh{' '}
                                {item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </details>

        {/* Account Details */}
        <details
          id="account-details"
          className="border-b border-foreground-faded py-6">
          <summary className="uppercase text-lg text-accent font-medium">
            Account Details{' '}
            <span className="italic text-foreground-light">({role})</span>
          </summary>

          <div className="py-4 flex flex-col gap-4">
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
        </details>
      </div>

      <CtaButton
        label="Sign Out"
        hideIcon
        icon={<LogOut size={16} />}
        onClick={handleSignOut}
        secondary
        className="w-fit md:w-fit md:ml-24"
      />
    </section>
  );
}
