import {GetServerSideProps, NextApiHandler, NextPage} from 'next';
import {Handler, withIronSession} from 'next-iron-session';

export function withSession(handler: NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    password: process.env.SECRET,
    cookieName: 'blog',
    cookieOptions: {
      secure: false
    }
  })
}