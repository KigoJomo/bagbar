import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  const pathname = req.nextUrl.pathname;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session?.user.id)
        .single();
      if (!error) {
      }

      if (!session) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }

      if (!profile || profile?.role !== 'admin') {
        console.log('Unauthorized access attempt');
        return NextResponse.redirect(new URL('/', req.url));
      }
    };

    checkSession();
  }

  return res;
}
