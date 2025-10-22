import { NextResponse } from 'next/server'

export async function GET() {
  const res = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))

  // Asigna cookie del token válida durante 30 días
  res.cookies.set({
    name: 'access_token',
    value: process.env.PRIVATE_ACCESS_TOKEN!,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  return res
}
