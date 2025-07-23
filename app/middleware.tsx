import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
  const isAuthPage = req.nextUrl.pathname.startsWith('/admin/auth')

  if (isAdminPage && !session && !isAuthPage) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/admin/auth'
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}
