import {NextApiHandler} from 'next';
import {withIronSession} from 'next-iron-session';

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    password: process.env.SECRET,
    cookieName: 'blog',
    cookieOptions: {
      secure: false
    }
  })
}