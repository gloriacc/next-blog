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

type Props = {
  post: Post,
  user: User
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
    > a {
      color: #FCBAD3;
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
  const {post} = props;

  return (
    <Layout>
      <Wrapper>
        <h1>{post.title}</h1>
        <div><Link href={'/posts'}><a>上一篇</a></Link>{dayjs(post.updatedAt).format('YYYY.MM.DD')}<Link href={'/posts'}><a>下一篇</a></Link></div>
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
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      user: JSON.parse(JSON.stringify(user || ''))
    }
  };
});