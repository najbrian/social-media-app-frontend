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
          {post.title}
        </div>

      ))}
    </main>
  );
};

export default Dashboard;
