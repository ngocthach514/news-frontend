import { NextResponse } from 'next/server';

export async function POST() {
  // call backend to clear refresh token cookie
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return NextResponse.redirect(new URL('/', 'http://localhost:3000'));
}
