import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Skill = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
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
    <AppLayout>
      {/* {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)} */}
      <div class="allWrap">
       <div class="rightWrap">
            <section>
               <article>         
                  <div class="bg bg1">      
                     <span>ES6</span>
                  </div>         
               </article>
               
               <article>      
                  <div class="txt">
                     <p>
                        <strong>TYPESCRIPT</strong><br />
                        <em>타입스크립트는 자바스크립트의 슈퍼셋인 오픈소스 프로그래밍 언어이다. </em>
                     </p>
                  </div>   
               </article>
               
               <article>         
                  <div class="txt">   
                     <p><strong>JQUERY</strong></p>
                  </div>   
               </article>
               
               <article>
                  <div class="bg bg2">
                     <span>HTML</span>
                  </div>   
               </article>
               
               <article>
                  <div class="bg bg3">
                     <span>CSS</span>
                  </div>   
               </article>
               
               <article>   
                  <div class="txt">   
                     <p>
                        <strong>NodeJS</strong><br />
                        <em>Node.js는 크로스플랫폼 오픈소스 자바스크립트 런타임 환경으로 윈도우, 리눅스, macOS 등을 지원한다.</em>
                     </p>
                  </div>   
               </article>
               
               <article>
                  <div class="bg bg4">
                     <span>THYMELEAF</span>
                  </div>
               </article>
               
               <article>   
                  <div class="txt">
                     <p>
                        <strong>JAVASCRIPT</strong><br />
                        <em>자바스크립트는 객체 기반의 스크립트 프로그래밍 언어이다.</em>
                     </p>
                  </div>   
               </article>
               
               <article>      
                  <div class="bg bg5">
                     <span>TOMCAT</span>
                  </div>
               </article>
               
               <article>   
                  <div class="bg bg6">
                     <span>REACT</span>
                  </div>   
               </article>
               
               <article>
                  <div class="txt">   
                     <p>
                        <strong>SERVLET</strong><br />
                        <em>I Can show you the world</em>
                     </p>
                  </div>   
               </article>
               
               <article>   
                  <div class="bg bg7">
                     <span>JSP</span>
                  </div>      
               </article>
               
               
               
            </section>
      
         </div>
         </div>
    </AppLayout>
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

export default Skill;
