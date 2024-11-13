import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import Chats from './components/Chats/Chats';
import * as authService from '../src/services/authService'; // import the authservice
import * as postService from '../src/services/postService';

export const AuthedUserContext = createContext(null);

const App = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const posts = await postService.index()
      console.log('Posts:', posts)
      setPosts(posts)
    }
    if (user) fetchAllPosts();

  }, [user])

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
            <Route path="/" element={<Dashboard user={user} posts={posts} />} />
            <Route path="/message" element={ <Chats/> }/>
            
            
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
