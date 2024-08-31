import React, { useEffect, useState, useContext } from 'react';
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import Post from './Post';
import HomeContext from '../../../context/HomeProvider';

function Posts() {
  const [posts, setPosts] = useState([]);
  const axiosInstance = useAxiosInstance();
  const { MyInfo } = useContext(HomeContext);

  useEffect(() => {
    const fetchPosts = async () => {
      if (MyInfo.email) {
        try {
          console.log('Fetching posts for email:', MyInfo.email);
          const res = await axiosInstance.get(
            `/getPostsOfFriends?email=${MyInfo.email}`,
          );
          setPosts(res.data.posts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };
    fetchPosts();
  }, [MyInfo.email]);

  useEffect(() => {
    console.log('POSTS:', posts);
  }, [posts]);

  return (
    <div className="transition-all ease-in-out w-full flex justify-center">
      <div className="w-full ">
        {posts.map((post) => (
          <Post
            key={post.id}
            Desc={post.post_text}
            email={post.email}
            Post={post.post}
            time={post.created_at}
            img_url={post.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;
