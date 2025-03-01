import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

// Define the session data type
export interface SessionData {
  isLoggedIn: boolean;
  username?: string;
  userId?: string;
  // Add any other session data you need
}

export const sessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    'complex_password_at_least_32_characters_long',
  cookieName: 'cognito-scalekit-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  // Initialize the session if it's new
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }

  return session;
}

// For type safety
declare module 'iron-session' {
  interface IronSessionData {
    user?: SessionData;
  }
}
