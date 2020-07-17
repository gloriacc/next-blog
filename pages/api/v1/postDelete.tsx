import {NextApiHandler} from 'next';
import {Post} from '../../../src/entity/Post';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {withSession} from '../../../lib/session';

const PostDelete:NextApiHandler =  withSession(async (req, res) => {
  if (!req.query.id) {
    res.statusCode = 400;
    res.end('request error');
    return;
  }
  const {id} = req.query;
  const connection = await getDatabaseConnection();
  await connection.manager.softDelete(Post, id);
  res.statusCode = 200;
  res.end('success');
});
export default PostDelete;