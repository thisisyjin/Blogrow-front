import React from 'react';
import Pagination from '../../components/posts/Pagination';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

//page, lastPage, username, tag
const PaginationContainer = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');
  const page = parseInt(searchParams.get('page')) || 1;

  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    loading: loading['posts/LIST_POSTS'],
    posts: posts.posts,
  }));

  if (!posts || loading) return null;
  return (
    <Pagination
      page={parseInt(page)}
      lastPage={lastPage}
      username={username}
      tag={tag}
    />
  );
};

export default PaginationContainer;
