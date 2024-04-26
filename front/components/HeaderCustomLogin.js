
import React, { useCallback } from 'react';
import sns1 from '../src/homeImages/img/sns1.png';
import sns2 from '../src/homeImages/img/sns2.png';
import sns3 from '../src/homeImages/img/sns3.png';
import sns4 from '../src/homeImages/img/sns4.png';
import sns5 from '../src/homeImages/img/sns5.png';
import Image from 'next/image';
import LoginIcon from '@mui/icons-material/Login';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import {  Stack } from '@mui/material';


const HeaderCustomLogin = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <>
      <div>
        <header>
          <div className="upperSide">
            <div className="upperLeftside">
              <strong>&nbsp;&nbsp;&nbsp;문의사항 : 010-2635-2675</strong>
            </div>
                <div className="upperRightside">
                  <Stack direction='row-reverse' >
                    <Stack onClick={onLogOut} loading={logOutLoading}><a><LogoutOutlinedIcon />로그아웃</a></Stack>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link href="/profile"><a><Person2OutlinedIcon />{me.nickname}</a></Link>&nbsp;&nbsp;&nbsp;
                  </Stack>
                </div>
          </div>
          <Stack sx={{ cursor: "pointer" }}>
            <Link href='/'>
              <h1 className="logo">차정훈</h1>
            </Link>
          </Stack>

          <nav className="gnb">

            <ul>
              <li> <Link href="/skill" ><a>SKILL</a></Link></li>
              <li>  <Link href="/facebook"><a>FACEBOOK</a></Link></li>
              {/* <li>  <Link href="/"><a>MATZIP</a></Link></li> */}
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
    </>
  );

}

export default HeaderCustomLogin;