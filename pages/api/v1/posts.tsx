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
    post.author = req.session.get('currentUser');
    const connection = await getDatabaseConnection();
    await connection.manager.save(post);
    res.json(post);
  }
});
export default Posts;