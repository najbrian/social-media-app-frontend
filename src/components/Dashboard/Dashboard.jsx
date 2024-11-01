import { AuthedUserContext } from '../../App';
import { useState, useContext, useEffect } from 'react';

const Dashboard = (props) => {
  const user = useContext(AuthedUserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.posts.filter(post => post.isPublic === true));
  }, [props.posts])

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
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
