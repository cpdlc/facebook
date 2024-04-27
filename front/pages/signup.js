import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Row, Col } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST, signupOpenSuccessAction } from '../reducers/user';
import wrapper from '../store/configureStore';
import AuthCardWrapper from '../components/AuthCardWrapper';
import Link from 'next/link';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      // Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      // Router.replace('/login');
      // dispatch(signupOpenSuccessAction());
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);



  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [isValid, setIsValid] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    // console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
    dispatch(signupOpenSuccessAction());
  }, [email, password, passwordCheck, term]);

  useEffect(() => {

    if (!!password && !!nickname && !!passwordCheck && !!email && !!term && !passwordError) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }

  }, [password, nickname, passwordCheck, email, term, passwordError])
  // console.log(!!password && !!nickname && !!passwordCheck && !!email && !!term && !passwordError)
  return (
    // <AppLayout>
    <>
      <Row gutter={24}>
        <Col xs={24} md={6}>
        </Col>
        <Col xs={24} md={12}>
          <AuthCardWrapper>
            <div id="container">
              <div class="wrapper">
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
                  </a> */}&lt; / &gt; 회원가입
                  </h1>
                </Stack>
                <div class="signupWrap">
                  <Form onFinish={onSubmit}>
                    <p>
                      <Input
                        placeholder="아이디"
                        name="user-email"
                        type="text"
                        value={email}
                        required
                        onChange={onChangeEmail} />
                    </p>
                    <p><Input
                      placeholder="닉네임"
                      name="user-nick"
                      value={nickname}
                      required
                      onChange={onChangeNickname} /></p>
                    <p><Input
                      placeholder="비밀번호"
                      name="user-password"
                      type="password"
                      value={password}
                      required
                      onChange={onChangePassword} /></p>
                    <p><Input
                      placeholder="비밀번호 확인"
                      name="user-password-check"
                      type="password"
                      value={passwordCheck}
                      required
                      onChange={onChangePasswordCheck}
                    /></p>
                    {/* <p>{passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}</p> */}
                    <p>
                      <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>정훈이의 포토폴리오를 봐주세요</Checkbox>
                        {/* {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>} */}
                      </div>
                    </p>
                    <p>
                      <div style={{ margin: 10 }}>
                        <Box sx={{ mt: 5, textAlign: 'center' }}>
                          {passwordError ? <>
                            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
                          </> : <>
                            <Button
                              type="primary" htmlType="submit" loading={signUpLoading}
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
                              회원가입
                            </Button>
                          </>}
                        </Box>
                      </div>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
            <div id="container2">
              <div class="wrapper2">
                <span>계정이 있으신가요?
                  <Link href="/login">로그인</Link>
                </span>
              </div>
            </div>


            {/* <Grid container spacing={2} flexDirection="column">
        <Grid item xs={12}>
							<Typography variant="h6" sx={{ textAlign: 'center', my: 1 }}>
								회원가입
							</Typography>
						</Grid>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">아이디</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호확인</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>정훈이의 포토폴리오를 봐주세요</Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Box sx={{ mt: 5, textAlign: 'center' }}>
						<Button
            type="primary" htmlType="submit" loading={signUpLoading}
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
							회원가입
						</Button>
					</Box>
       
        </div>
      </Form>
      </Grid> */}
          </AuthCardWrapper>
        </Col>
      </Row>
   
    {/* </AppLayout> */ }
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   console.log('getServerSideProps start');
//   console.log(context.req.headers);
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch(END);
//   console.log('getServerSideProps end');
//   await context.store.sagaTask.toPromise();
// });

export default Signup;
