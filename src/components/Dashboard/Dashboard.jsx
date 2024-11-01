import { AuthedUserContext } from '../../App';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../PostForm/PostForm';
import * as postService from '/src/services/postService';

const Dashboard = (props) => {
  const navigate = useNavigate()
  const user = useContext(AuthedUserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.posts.filter(post => post.isPublic === true));
  }, [props.posts])

  const handleAddPost = async(formData) => {
    const newPost = await postService.createPost(formData); 
    setPosts([...posts], newPost);
    console.log('new post created successfully', newPost);
    navigate('/')
  }



  return (
    <main>
      <h1>Welcome, {user.username}</h1>

      <PostForm handleAddPost={handleAddPost}/>


      {posts.map((post, idx) => (
        <div key={idx}>
        
          <p>{post.title}</p>
          <p>
          {post.author.username} posted on {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p>{post.description}</p>

        </div>

      ))}
    </main>
  );
};

export default Dashboard;
