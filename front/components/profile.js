import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { backUrl } from '../config/config';
import { Col, Row } from 'antd';
import AuthCardWrapper from './AuthCardWrapper';
import { Stack } from '@mui/material';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { data: followersData, error: followerError } = useSWR(`${backUrl}/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingError } = useSWR(`${backUrl}/user/followings?limit=${followingsLimit}`, fetcher);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (!me) {
    return '내 정보 로딩중...';
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다.</div>;
  }

  return (
    <>
      <Row gutter={24}>
        <Col xs={24} md={6}>
        </Col>
        <Col xs={24} md={12}>
          <AuthCardWrapper>
            <div id="container" style={{height:"350px"}}>
              <div class="wrapper" >
                {/* <header>
              <h1 class="logo"><a href="index.html"><img src="img/logo.png" alt="차코딩 로그인페이지" /></a></h1>

              <p>차정훈 지원자의 정보를 보려면 가입하세요.</p>
            </header> */}
                <Stack
                  sx={{
                    textAlign: 'center',
                    marginBottom: "20px",
                    fontWeight: "bolder",
                    fontSize: "40px"
                  }}>
                  <h1>
                    {/* <a href="index.html">
                    <img src="img/logo.png" alt="로그인페이지" />
                  </a> */}&lt; / &gt; 프로필
                  </h1>
                </Stack>
                <div class="signupWrap">
                <Head>
                  <title>내 프로필 | Facebook</title>
                </Head>
                {/* <AppLayout> */}
                {/* <Row gutter={24}>
                  <Col xs={24} md={6}>
                  </Col>
                  <Col xs={24} md={12}> */}
                    <NicknameEditForm />
                    {/* <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
            <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} /> */}
                  {/* </Col> */}
                {/* </Row> */}
                </div>
              </div>
            </div>
          </AuthCardWrapper>
        </Col>
      </Row>


      {/* </AppLayout> */}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  // console.log('getServerSideProps start');
  // console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  // console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Profile;
