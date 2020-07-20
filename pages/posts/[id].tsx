import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import React from 'react';
import {withSession} from '../../lib/session';
import {User} from '../../src/entity/User';
import marked from 'marked';
import hljs from 'highlight.js';
import styled from 'styled-components';

type Props = {
  post: Post,
  user: User
};

const Wrapper = styled.main`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 48px;
  margin: 0 auto;
  pre {
   code {
     display: block;
     overflow-x: auto;
     padding: 0.5em;
     background: #2b2b2b;
     color: #bababa;
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
    <Wrapper>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: marked(post.content)}}>

      </article>
    </Wrapper>
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