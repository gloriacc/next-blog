import {NextApiHandler} from 'next';
import {Post} from '../../../src/entity/Post';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {withSession} from '../../../lib/session';

const Posts:NextApiHandler =  withSession(async (req, res) => {
  if (req.method === 'POST') {
    const {title, content} = req.body;
    const post = new Post();
    post.title = title;
    post.content = content;
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    post.author = user;
    const connection = await getDatabaseConnection();
    await connection.manager.save(post);
    res.json(post);
  } else if (req.method === 'PUT') {
    const {title, content, id} = req.body;
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, id);
    post.title = title;
    post.content = content;
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    await connection.manager.save(post);
    res.json(post);
  }
});
export default Posts;