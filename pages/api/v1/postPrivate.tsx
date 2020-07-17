import {NextApiHandler} from 'next';
import {Post} from '../../../src/entity/Post';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {withSession} from '../../../lib/session';

const PostPrivate:NextApiHandler =  withSession(async (req, res) => {
  if (!req.body.id) {
    res.statusCode = 400;
    res.end('request error');
    return;
  }
  const {id} = req.body;
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne(Post, id);
  await connection.manager.update(Post, id, {isPrivate: !post.isPrivate});
  res.statusCode = 200;
  res.end('success');
});
export default PostPrivate;