import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col, Button } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { AppBar, Box, CssBaseline, Fab, IconButton, Snackbar, Stack, Toolbar, Typography } from '@mui/material';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';
import HeaderCustomLogin from './HeaderCustomLogin';
import HeaderCustomLogout from './HeaderCustomLogout';
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const { me } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    
    
    <Stack>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        minHeight: '100%',
      }}>
        <Stack>
          {me ? <HeaderCustomLogin /> : <HeaderCustomLogout />}
          {/* <Toolbar sx={{ justifyContent: 'center' }}>
            <Menu mode="horizontal">
              <Menu.Item>
                <Link href="/"><a>HOME</a></Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/protfolio"><a>이력서</a></Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/facebook"><a>페이스북</a></Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/"><a>맛집 앱</a></Link>
              </Menu.Item>
              <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>

              {!me && <>
                <Menu.Item>
                  <Link href="/login"><a><Button>로그인</Button></a></Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                </Menu.Item>
              </>}
               <Menu.Item> //해시태그 검색
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item> 
            </Menu>

          </Toolbar> */}
        </Stack>
        {/* <Row gutter={24}>
          <Col xs={24} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
            {me ? <UserProfile /> : <></>}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
          <a href="https://www.zerocho.com" target="_blank" rel="noreferrer noopener">Made by ZeroCho</a>
        </Col>
        </Row> */}
        <Stack>
          <div class="appWrap">
          {children}
          </div>
        </Stack>
      </Box>
      {/* <Stack
        direction='row'
        justifyContent='center'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.grey[700],
          marginTop: '5rem',
          paddingTop: '30px',

          position: 'relative',
          height: '7rem',
          transform: 'translateY(100%)',


        }}>

        <Stack direction="row"
          justifyContent="flex-start"
          spacing={3}
        ></Stack>
        <Typography sx={{ lineHeight: 2, textAlign: 'center' }}>
          대표 : 차정훈   | 주소 : 서울특별시 송파구 동남로 193 | ㈜차정훈 | 대표전화 010-2635-2675 <br />
          저의 포토폴리오를 사랑해 주셔서 감사합니다. <br />
        </Typography>
      </Stack> */}

    </Stack>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
