import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import { useParams, useNavigate } from 'react-router-dom';
import { setOriginalPost } from '../../modules/write';
import PostActionButtons from '../../components/post/PostActionButtons';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user, // 로그인 상태 (user)
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId)); // readPost에 postId(payload)를 전달하여 API 호출
    return () => {
      dispatch(unloadPost());
    }; // return 안에는 정리함수 (componentWillUnmount)
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  const onRemove = async () => {
    try {
      console.log(postId);
      await removePost(postId); // useParams로 받은 postId
      navigate('/'); // 삭제 후 홈으로 이동.
    } catch (e) {
      console.log(e);
    }
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default PostViewerContainer;
