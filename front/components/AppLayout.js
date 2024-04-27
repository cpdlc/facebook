import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Box, Stack } from '@mui/material';
import useInput from '../hooks/useInput';
import sns1 from '../src/homeImages/img/sns1.png';
import sns2 from '../src/homeImages/img/sns2.png';
import sns3 from '../src/homeImages/img/sns3.png';
import sns4 from '../src/homeImages/img/sns4.png';
import sns5 from '../src/homeImages/img/sns5.png';
import logo from '../components/images/logo2.png';
import Image from 'next/image';
import LoginIcon from '@mui/icons-material/Login';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import Link from 'next/link';
import { loginOpenAction, loginOpenSuccessAction, logoutRequestAction, signupOpenAction, signupOpenSuccessAction } from '../reducers/user';
import Home from './home';
import Skill from './skillHome';
import Facebook from './facebookHome';
import wrapper from '../store/configureStore';
import axios from 'axios';
import LoginForm from '../pages/login';
import Signup from '../pages/signup';
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
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
  const [searchInput, onChangeSearchInput] = useInput('');
  const { me, logOutLoading,loginOpenLoading,signupOpenLoading  } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const onOpenLogIn = useCallback(() => {
    dispatch(loginOpenAction());
    dispatch(signupOpenSuccessAction())
  }, []);

  const onOpenSignUp = useCallback(() => {
    dispatch(signupOpenAction());
    dispatch(loginOpenSuccessAction())
  }, []);

  const [homeOpen, setHomeOpen] = useState(true)
  const [skillOpen, setSkillOpen] = useState(false)
  const [facebookOpen, setFacebookOpen] = useState(false)

  const homeClick = useCallback(() => {
    setHomeOpen(true)
    setSkillOpen(false)
    setFacebookOpen(false)
  }, [])


  const skillClick = useCallback(() => {
    setHomeOpen(false)
    setSkillOpen(true)
    setFacebookOpen(false)
  }, [])


  const facebookClick = useCallback(() => {
    setHomeOpen(false)
    setSkillOpen(false)
    setFacebookOpen(true)
  }, [])

  return (


    <Stack>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        minHeight: '100%',
      }}>
        <Stack>
          <div>
            <header>
              <div className="upperSide">
                <div className="upperLeftside">
                  <strong>&nbsp;&nbsp;&nbsp;문의사항 : 010-2635-2675</strong>
                </div>
                {me ? <div className="upperRightside">
                  <Stack direction='row-reverse' >
                    <Stack onClick={onLogOut} loading={logOutLoading}><a><LogoutOutlinedIcon />로그아웃</a></Stack>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link href="/profile"><a><Person2OutlinedIcon />{me.nickname}</a></Link>&nbsp;&nbsp;&nbsp;
                  </Stack>
                </div> : <div className="upperRightside">
                  <Stack justifyContent='flex-end' direction='row'>
                    <Box onClick={onOpenLogIn}><a><LoginIcon />&nbsp;로그인</a></Box>
                    <Box onClick={onOpenSignUp}><a><PersonAddAlt1OutlinedIcon />&nbsp;회원가입</a></Box>&nbsp;&nbsp;&nbsp;
                  </Stack>
                </div>}
              </div>
              <Stack sx={{ cursor: "pointer" }}>
                <Box onClick={homeClick} >
                  <h1 className="logo" style={{ background: "url(images/logo2.png)" }} >차정훈</h1>
                </Box>
                <img src={logo} alt="" />
              </Stack>

              <nav className="gnb">

                <ul>
                  <li> <Box onClick={skillClick} ><a>SKILL</a></Box></li>
                  <li>  <Box onClick={facebookClick} ><a>FACEBOOK</a></Box></li>
                  <li>  <Link href="https://github.com/cpdlc" ><a target='_blank'>GIT</a></Link></li>
                </ul>
              </nav>
              <div className="snsSet">
                <a href="#"><Image src={sns1} alt="about" /></a>
                <a href="#"><Image src={sns2} alt="contact" /></a>
                <a href="https://www.facebook.com/" target='_blank'>

                  <Image src={sns3} alt="facebook" /></a>
                <a href="https://www.instagram.com/" target='_blank'><Image src={sns4} alt="twitter" /></a>
                <a href="https://www.kakaocorp.com/page/" target='_blank'><Image src={sns5} alt="etc" /></a>
              </div>
            </header>
          </div>
        </Stack>
        <Stack>
          <div class="appWrap">
            {/* {children} */}
            {homeOpen && 
               <>
               <div class="wrap" >
                  <main>
                     <div class="skills">
                        <div class="inner">
                           {loginOpenLoading && <LoginForm />}
                           {signupOpenLoading && <Signup />}
                        </div>
                     </div>
                     <div class="skills">
                        <div class="inner">
                           <h2><span>활용능력 Skills</span></h2>
                           <ul class="skill_list">
                              <li>
                                 퍼블리싱
                                 <ul>
                                    <li><span>HTML 5</span></li>
                                    <li><span>CSS</span></li>
                                    <li><span>JAVASCRIPT</span></li>
                                 </ul>
                              </li>
                              <li>
                                 프론트엔드
                                 <ul>
                                    <li><span>TYPESCRIPT</span></li>
                                    <li><span>REACT</span></li>
                                    <li><span>REACT NATIVE</span></li>
                                    <li><span>REDUX</span></li>
                                 </ul>
                              </li>
                              <li>
                                 백엔드
                                 <ul>
                                    <li><span>NODEJS</span></li>
                                    <li><span>SERVLET</span></li>
                                    <li><span>JSP</span></li>
                                 </ul>
                              </li>
                              <li>
                                 TOOLS
                                 <ul>
                                    <li><span>BITBUCKET</span></li>
                                    <li><span>VSCODE</span></li>
                                 </ul>
                              </li>
                              <li>
                                 ETC
                                 <ul>
                                    <li><span>정보처리기사 필기합격</span></li>
                                    <li><span>MySql 기본지식 보유</span></li>
                                    <li><span>AWS 배포 기본지식</span></li>
                                    <li><span>프론트엔드 실무경험有</span></li>
                                 </ul>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div class="portfolio">
                        <div class="inner">
                           <h2><span>프로젝트 Project</span></h2>
                           <ol class="portfolio_list">
                              <li>
                                 <div class="img_area"><img src="images/img_portfolio10.png" alt="" /></div>
                                 <div class="portfolio_cont">
                                    <h3>
                                       <span class="num_portfolio">01</span>
                                       U2CLOUD
                                    </h3>
                                    <p class="contribute">
                                       프론트 50% , 백엔드 20%
                                    </p>
                                    <p class="summary">
                                       실제 프론트엔드로서 업무를 수행한 사이트 입니다. spring과 react 사이에 node로 api를 만들었습니다.
                                       <br /><br />U2CLOUD HOME , ADMIN , PORTAL , ALIMI 총 4개의 FRONT로 구성되어있고 병원에서 마케팅 문자발송 시스템입니다.
                                    </p>
                                    <ul class="point">
                                       <li>
                                          <span>React JS</span>
                                       </li>
                                       <li>
                                          <span>Node JS</span>
                                       </li>
                                    </ul>
                                    <div class="btn_area">
                                    </div>
                                    <table class="file_link">
                                       <thead>
                                          <tr>
                                             <th id="col1">Category</th>
                                             <th id="col2"></th>
                                             <th id="col3">Page</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td headers="col1">
                                                <span class="category html">React</span><span class="category css">Node</span>
                                             </td>
                                             <td headers="col2">
                                                <span></span><span ></span>
                                             </td>
                                             <td headers="col3">
                                                <a href="https://www.u2cloud.co.kr/" target="_blank">Web Site</a>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </li>
                              <li>
                                 <div class="img_area"><img src="images/img_portfolio9.png" alt="" /></div>
                                 <div class="portfolio_cont">
                                    <h3>
                                       <span class="num_portfolio">02</span>
                                       FACEBOOK 따라하기
                                    </h3>
                                    <p class="contribute">
                                       풀스텍
                                    </p>
                                    <p class="summary">
                                       facebook을 Clone coding 하면서 만든 사이트입니다. 프론트와 백엔드 배포까지 하였습니다.<br /><br />현재 웹사이트에서 facebook을 클릭하시면 제가 만든 사이트를 이용하실수 있습니다.
                                       회원가입 로그인 좋아요 게시글 등록 수정 삭제등을 하실수 있습니다.
                                    </p>
                                    <ul class="point">
                                       <li>
                                          <span>React JS / Next JS</span>
                                       </li>
                                       <li>
                                          <span>Node JS</span>
                                       </li>
                                    </ul>
                                    <div class="btn_area">
      
                                    </div>
                                    <table class="file_link">
                                       <thead>
                                          <tr>
                                             <th id="col1">Category</th>
                                             <th id="col2">Source</th>
                                             <th id="col3">Page</th>
                                          </tr>
      
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td headers="col1">
                                                <span class="category html">React</span><span class="category css">Node</span>
                                             </td>
                                             <td headers="col2">
                                                <a href="https://github.com/cpdlc/facebook" target="_blank">Github Page</a>
                                             </td>
                                             <td headers="col3">
                                             <Box onClick={facebookClick} ><a>Web Page</a></Box>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </li>
                              <li>
                                 <div class="img_area"><img src="images/img_portfolio4.png" alt="" /></div>
                                 <div class="portfolio_cont">
                                    <h3>
                                       <span class="num_portfolio">03</span>
                                       리엑트 네이티브 기본앱
                                    </h3>
                                    <p class="contribute">
                                       프론트
                                    </p>
                                    <p class="summary">
                                       리엑트 네이티브를 이용하여 만든 기본앱입니다.<br /><br />로그인 회원가입을 구현하였습니다.
                                    </p>
                                    <ul class="point">
                                       <li>
                                          <span>React Native</span>
                                       </li>
                                    </ul>
                                    <div class="btn_area">
      
                                    </div>
                                    <table class="file_link">
                                       <thead>
                                          <tr>
                                             <th id="col1">Category</th>
                                             <th id="col2">Source</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td headers="col1">
                                                <span class="category html">React Native</span>
                                             </td>
                                             <td headers="col2">
                                                <a href="https://github.com/cpdlc/reactnative" target="_blank">Github Page</a>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </li>
                              <li>
                                 <div class="img_area"><img src="images/img_portfolio6.png" alt="" /></div>
                                 <div class="portfolio_cont">
                                    <h3>
                                       <span class="num_portfolio">04</span>
                                       역동적 반응형 사이트
                                    </h3>
                                    <p class="contribute">
                                       퍼블리싱
                                    </p>
                                    <p class="summary">
                                       HTML과 CSS를 활용한 프토폴리오입니다.<br /><br />애니메이션과 MEDIA를 이용한 역동적 반응형 사이트입니다.
                                    </p>
                                    <ul class="point">
                                       <li>
                                          <span>Html</span>
                                       </li>
                                       <li>
                                          <span>Css</span>
                                       </li>
                                    </ul>
                                    <div class="btn_area">
      
                                    </div>
                                    <table class="file_link">
                                       <thead>
                                          <tr>
                                             <th id="col1">Category</th>
                                             <th id="col2">Source</th>
                                             <th id="col3">Page</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td headers="col1">
                                                <span class="category html">html</span><span class="category js">css</span>
                                             </td>
                                             <td headers="col2">
                                                <a href="https://github.com/cpdlc/practicefront" target="_blank">Github Page</a>
                                             </td>
                                             <td headers="col3">
                                             <Box onClick={skillClick} ><a>Web Page</a></Box>
      
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </li>
      
                           </ol>
                        </div>
                     </div>
                     <button type="button" class="btn_top"><span class="hidden_text">최상단으로 가기</span></button>
                  </main>
                  <footer>
                     <h2>Contacts</h2>
                     <ul class="contact_list">
                        <li>
                           <a href="mailto:cpdlc@naver.com"><i class="far fa-envelope"></i>cpdlc@naver.com</a>
                        </li>
                        <li><i class="fas fa-phone"></i>010 2635 2675</li>
                        <li><a href="https://github.com/cpdlc" target='_blank'><i class="fab fa-github"></i>GitHub account</a></li>
                     </ul>
                  </footer>
               </div >
            </>}





            {skillOpen && <Skill />}
            {facebookOpen && <Facebook />}
          </div>
        </Stack>
      </Box>
    </Stack>
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

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
