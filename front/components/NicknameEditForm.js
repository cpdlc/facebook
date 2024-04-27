import { Form, Input } from 'antd';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import { CHANGE_EMAIL_REQUEST, CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import Password from 'antd/lib/input/Password';

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const [email, onChangeEmail] = useInput(me?.email || '');
  const dispatch = useDispatch();
  const onNicknameSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
    return alert("닉네임이 변경되었습니다.")
  }, [nickname]);
  const onEmailSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_EMAIL_REQUEST,
      data: email,
    });
    return alert("아이디가 변경되었습니다.")
  }, [email]);

  return (
    <>
      <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
      <Input.Search
        value={email}
        onChange={onChangeEmail}
        addonBefore="아이디"
        enterButton="수정"
        onSearch={onEmailSubmit}
      />
    </Form>
    <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onNicknameSubmit}
      />
    </Form>
  
    </>
  );
};

export default NicknameEditForm;
