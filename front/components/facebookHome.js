import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from './AppLayout';
import PostForm from './PostForm';
import PostCard from './PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { Col, Row } from 'antd';
import LoginForm from '../pages/login';
import Signup from '../pages/signup';
import Profile from './profile';

const Facebook = () => {
  const dispatch = useDispatch();
  const { me, loginOpenLoading ,signupOpenLoading ,profileOpenLoading} = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);
  return (
    <>
      <div class="skills">
        <div class="inner">
        {profileOpenLoading && <Profile />}
          {loginOpenLoading && <LoginForm />}
          {signupOpenLoading && <Signup />}
        </div>
      </div>
      <Row gutter={20}>

        <Col xs={20} md={6}>

        </Col>
        <Col xs={24} md={12}>
          {me && <PostForm />}
          {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Facebook;
