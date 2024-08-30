import React from 'react'
import { useEffect, useState  } from 'react'
import useAxiosInstance from '../../../hooks/useAxiosInstance';
import Post from './Post';




function Posts() {
    const [posts, setPosts] = useState([]);

    const axiosInstance = useAxiosInstance();
    // const getEmail = async () => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     return await axiosInstance.post('/myinfo', { accessToken });
    // };
    const [MyInfo, setMyInfo] = useState({});
    MyInfo.email = 5;



    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("-----------",MyInfo.email);
                const res = await axiosInstance.get(`/getPostsOfFriends?email=${MyInfo.email}`);
                setPosts(res.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        console.log("POST AREE-  ",posts);
    }, [posts]);




  return (
    <div  className='transition-all ease-in-out w-full flex justify-center'>

        <div className='w-full ml-72'>
            {posts.map((post) => (
                <Post Desc={post.post_text} email={post.email} Post={post.post} time={post.created_at} />
            ))}

        </div>         
    </div>
  )
}

export default Posts