import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import React from 'react';
import {withSession} from '../../lib/session';
import {User} from '../../src/entity/User';
import marked from 'marked';
import hljs from 'highlight.js';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import dayjs from 'dayjs';
import Link from 'next/link';
import {getManager} from 'typeorm';
import Icon from '../../components/Icon';
import '../../assets/icons/home.svg';

type Props = {
  post: Post,
  user: User,
  prePost: Post,
  nextPost: Post,
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  min-width: 300px;
  > h1 {
    color: #FFFFD2;
  }
  > div {
    width: 100%;
    color: #FCBAD3;
    display: flex;
    justify-content: space-between;
    text-align: center;
    a {
      color: #FCBAD3;
    }
    > span {
      margin: 0 auto;
      > a {
        margin-right: 10px;
        > .home {
          fill: #FCBAD3;
          width: 16px;
          height: 16px;
        }
      }     
    }
  }
  
  > article {
    width: 100%;
    h1, h2, h3 {
      color: #FFFFD2;
    }
    p, ul, ol {
      color: #666666;
      line-height: 20px;
      a {
        color: #FCBAD3;
      }
    }
    pre {
     code {
       display: block;
       overflow-x: auto;
       padding: 1em;
       background: #474949;
       color: #d1d9e1;
       border-radius: 10px;
     }
    }
  }
`;

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(validLanguage, code).value;
  }
});

const postsShow: NextPage<Props> = (props) => {
  const {post, prePost, nextPost} = props;

  return (
    <Layout>
      <Wrapper>
        <h1>{post.title}</h1>
        <div>
          {!post.isPrivate && <Link href={prePost ? `/posts/${prePost.id}` : '/posts'}><a>上一篇</a></Link>}
          <span><Link href={'/posts'}><a><Icon className="home" name="home"/></a></Link>{dayjs(post.updatedAt).format('YYYY.MM.DD')}</span>
          {!post.isPrivate && <Link href={nextPost ? `/posts/${nextPost.id}` : '/posts'}><a>下一篇</a></Link>}
        </div>
        <article dangerouslySetInnerHTML={{__html: marked(post.content)}}>

        </article>
      </Wrapper>
    </Layout>
  )
};
export default postsShow;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  // @ts-ignore
  const post = await connection.manager.findOne(Post, context.params.id);
  // @ts-ignore
  const user = context.req.session.get('currentUser');

  const prePost = await getManager()
    .createQueryBuilder(Post, "post")
    .where('post.isPrivate = :isPrivate', {isPrivate: false})
    .andWhere('post.updatedAt > :updatedAt', {updatedAt: post.updatedAt})
    .orderBy('post.updatedAt', 'DESC')
    .take(1)
    .getOne();
  const nextPost = await getManager()
    .createQueryBuilder(Post, "post")
    .where('post.isPrivate = :isPrivate', {isPrivate: false})
    .andWhere('post.updatedAt < :updatedAt', {updatedAt: post.updatedAt})
    .orderBy('post.updatedAt', 'DESC')
    .skip(1)
    .take(1)
    .getOne();

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      user: JSON.parse(JSON.stringify(user || '')),
      prePost: JSON.parse(JSON.stringify(prePost || '')),
      nextPost: JSON.parse(JSON.stringify(nextPost || ''))
    }
  };
});