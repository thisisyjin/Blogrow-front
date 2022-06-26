import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { updatePost, writePost } from '../../modules/write';
import { useNavigate } from 'react-router-dom';

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { title, body, tags, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    }),
  );

  const onPublish = () => {
    if (originalPostId) {
      // 수정하는 것이라면 - originalPostId가 존재
      dispatch(updatePost({ title, body, tags, id: originalPostId }));
      return;
    }
    dispatch(writePost({ title, body, tags }));
  };

  const onCancel = () => {
    navigate(-1); /// 이전 페이지로 이동 (history.go(-1)과 같음)
  };

  // 성공, 실패시 작업
  useEffect(() => {
    if (post) {
      // API 호출 성공시
      const { _id, user } = post;
      navigate(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      // 🔻 originalPostId가 true면 isEdit=true
      isEdit={!!originalPostId}
    />
  );
};

export default WriteActionButtonsContainer;
