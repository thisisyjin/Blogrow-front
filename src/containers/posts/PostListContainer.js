import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../modules/posts';
import PostList from '../../components/posts/PostList';
import { useParams, useSearchParams } from 'react-router-dom';

const PostListContainer = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user, // 로그인 상태
    }),
  );

  useEffect(() => {
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page')) || 1;
    dispatch(listPosts({ tag, page, username }));
  }, [dispatch, searchParams, username]);

  return (
    <PostList
      posts={posts}
      error={error}
      loading={loading}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
