import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Input, Row } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, loginOpenSuccessAction, loginRequestAction } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import Router from 'next/router';
import AuthCardWrapper from '../components/AuthCardWrapper';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [isValid, setIsValid] = useState(false);
  const [password, onChangePassword] = useInput('');
  const { logInLoading, logInDone, logInError, me } = useSelector((state) => state.user);
  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (logInDone) {
      // Router.replace('/');
      loginOpenSuccessAction();
    }
  }, [logInDone]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  useEffect(() => {
    if (!!email && !!password) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [email, password])


  return (
    // <AppLayout>
      <Row gutter={24}>
        <Col xs={24} md={6}>
        </Col>
        <Col xs={24} md={12}>
          <AuthCardWrapper>
            <div id="container">
              <div class="wrapper">
                <Stack
                  sx={{
                    textAlign: 'center',
                    marginBottom:"20px",
                    fontWeight: "bolder",
                    fontSize:"40px"
                  }}>
                  <h1>
                    {/* <a href="index.html">
                    <img src="img/logo.png" alt="로그인페이지" />
                  </a> */}&lt; / &gt; 로그인
                  </h1>
                </Stack>

                <div class="signupWrap">
                  <FormWrapper onFinish={onSubmitForm}>
                    <p><Input
                      placeholder="아이디"
                      name="user-email"
                      type="text"
                      value={email}
                      onChange={onChangeEmail}
                      required
                    /></p>
                    <p><Input
                      placeholder='비밀번호'
                      name="user-password"
                      type="password"
                      value={password}
                      onChange={onChangePassword}
                      required
                    /></p>

                    <p>
                      {/* <input type="submit" value="로그인" /> */}
                      <Button
                        type="primary" htmlType="submit" loading={logInLoading}
                        disableElevation
                        disabled={
                          !isValid
                        }
                        fullWidth
                        size="large"
                        variant="contained"
                        color={isValid ? 'primary' : 'inherit'}
                        sx={{ maxWidth: '24rem' }}
                      >
                        로그인
                      </Button>
                    </p>
                    {/* <div class="searchWrap">
                  <a href="#">아이디 찾기</a> |
                  <a href="#">비밀번호 찾기</a>
                </div> */}
                  </FormWrapper>
                </div>

              </div>

              <div id="container2">
                <div class="wrapper2">
                  <span>계정이 없으신가요?
                    <Link href="/signup">가입하기</Link>
                  </span>
                </div>
              </div>
            </div>

            {/* <AuthCardWrapper>
            <Stack>
        <Grid container spacing={2} flexDirection="column">
        <Grid item xs={12}>
        <Typography variant="h6" sx={{ textAlign: 'center', my: 1 }}>
            로그인
        </Typography>
    </Grid>
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">아이디</label>
        <br />
        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
      <div style={{ marginTop: 10 }}>
          <Box sx={{ mt: 5, textAlign: 'center'}}>
						<Button
            type="primary" htmlType="submit" loading={logInLoading}
							disableElevation
							disabled={
							  !isValid
							}
							fullWidth
							size="large"
							variant="contained"
							color={isValid ? 'primary' : 'inherit'}
							sx={{ maxWidth: '24rem' }}
						>
							로그인
						</Button>
					</Box>
       
        </div>
    </FormWrapper>
    </Grid>
    </Stack>
    </AuthCardWrapper> */}



          </AuthCardWrapper>


        </Col>
      </Row>
    // </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default LoginForm;
