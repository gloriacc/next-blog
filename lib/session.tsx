import {NextApiHandler} from 'next';
import {withIronSession} from 'next-iron-session';

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    password: '0e07843d-ad82-4dd1-8452-288d58b5b025',
    cookieName: 'blog',
    cookieOptions: {
      secure: false
    }
  })
}