import { AuthedUserContext } from "../../App";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../PostForm/PostForm";
import * as postService from "/src/services/postService";
import * as userProfileService from "/src/services/userProfileService";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const user = useContext(AuthedUserContext);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [displayFollowingPost, setDisplayFollowingPost] = useState(false);
  const [displayFYPPost, setDisplayFYPPost] = useState(true);

  useEffect(() => {
    setPosts(props.posts.filter((post) => post.isPublic === true));
  }, [props.posts]);

  const handleAddPost = async (formData) => {
    const newPost = await postService.createPost(formData);
    setPosts([...posts, newPost]);
    console.log("new post created successfully", newPost);
    navigate("/");
  };

  const handleFollow = async (userId) => {
    const followingProfiles = await userProfileService.userProfile(userId)
    setFollowing([...following, followingProfiles]);
  };

  console.log("following", following);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <button
        className="border-2 border-gray-400 rounded-md"
        onClick={() => {
          setDisplayFYPPost(!displayFYPPost);
          setDisplayFollowingPost(false);
        }}
      >
        FYP
      </button>
      <button
        className="border-2 border-gray-400 rounded-md"
        onClick={() => {
          handleFollow(user._id);
          setDisplayFollowingPost(!displayFollowingPost);
          setDisplayFYPPost(false);
        }}
      >
        Following
      </button>
      <PostForm handleAddPost={handleAddPost} />

      {posts.map(
        (post, idx) =>
          displayFYPPost && (
            <div key={idx}>
              <p>{post.title}</p>
              <p>
                {post.author.username} posted on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p>{post.description}</p>
            </div>
          )
      )}

      {posts.map(
        (post, idx) =>
          displayFollowingPost &&
          following.some(follow => follow._id === post.author._id) && (
            <div key={idx}>
              <p>{post.title}</p>
              <p>
                {post.author.username} posted on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p>{post.description}</p>
            </div>
          )
      )}
    </main>
  );
};

export default Dashboard;
