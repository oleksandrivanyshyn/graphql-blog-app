import React from 'react';
import Post from '../../components/Post/Post';
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export default function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      {data.posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.createdAt}
          user={post.user.name}
        />
      ))}
    </div>
  );
}
