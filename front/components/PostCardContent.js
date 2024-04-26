import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';

const { TextArea } = Input;
const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdate }) => {
  const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  });

  const onClickCancel = useCallback(() => {
    setEditText(postData);
    onCancelUpdate();
  });

  return ( // 첫 번째 게시글 #해시태그 #해시태그
    <div>
      {editMode
        ? (
          <>
            <TextArea value={editText} onChange={onChangeText} />
            <Stack direction="row" justifyContent="flex-end" sx={{marginTop:"10px"}} spacing={2}>
              <Stack>
              <Button loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
              </Stack>
              <Stack>
              <Button type="danger" onClick={onClickCancel}>취소</Button>
              </Stack>
            </Stack>
          </>
        )
        : postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/)) {
            return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>;
          }
          return v;
        })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onChangePost: PropTypes.func.isRequired,
  onCancelUpdate: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
