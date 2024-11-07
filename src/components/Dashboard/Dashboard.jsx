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
  const [followingPosts, setFollowingPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [displayFollowingPost, setDisplayFollowingPost] = useState(false);
  const [displayFYPPost, setDisplayFYPPost] = useState(true);

  // Fetch public posts on component mount or when props.posts changes
  useEffect(() => {
    setPosts(props.posts.filter((post) => post.isPublic === true));
  }, [props.posts]);

  // Fetch posts from followed users whenever `following` changes
  useEffect(() => {
    const fetchFollowingPosts = async () => {
      try {
        const userProfileData = await userProfileService.userProfile(user._id);

        // Check if `userProfileData` has `user` and `following` array
        if (
          userProfileData &&
          userProfileData.user &&
          userProfileData.user.following
        ) {
          const userIds = userProfileData.user.following.map(
            (followedUser) => followedUser._id
          );

          // Fetch posts for all followed user IDs
          const posts = await userProfileService.getPostsByUserIds(userIds);
          console.log(posts);
          setFollowingPosts(posts);
        }
      } catch (error) {
        console.error("Error fetching following posts:", error);
      }
    };

    fetchFollowingPosts();
  }, [user.following]);

  useEffect(() => {
    const fetchFollowingProfiles = async () => {
      if (props.user.following) {
        const followingProfiles = await userProfileService.getProfilesByUserIds(
          props.user.following.map((user) => user._id)
        );
        setFollowing(followingProfiles);
      }
    };
    fetchFollowingProfiles();
  }, [props.user._id]);

  // Function to add a new post
  const handleAddPost = async (formData) => {
    const newPost = await postService.createPost(formData);
    setPosts([...posts, newPost]);
    console.log("new post created successfully", newPost);
    navigate("/");
  };

  // // Function to follow a user and fetch followed users' posts
  // const handleFollow = async (userId) => {
  //   const followingProfile = await userProfileService.userProfile(userId);
  //   setFollowing((prevFollowing) => [...prevFollowing, followingProfile]);
  // };

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <button
        className="border-2 border-gray-400 rounded-md"
        onClick={() => {
          setDisplayFYPPost(true);
          setDisplayFollowingPost(false);
        }}
      >
        For You
      </button>
      <button
        className="border-2 border-gray-400 rounded-md"
        onClick={() => {
          setDisplayFollowingPost(true);
          setDisplayFYPPost(false);
        }}
      >
        Following
      </button>
      <PostForm handleAddPost={handleAddPost} />

      {/* Display public "For You" posts */}
      {displayFYPPost &&
        posts.map((post, idx) => (
          <div key={idx}>
            <p>{post.title}</p>
            <p>
              {post.author.username} posted on{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p>{post.description}</p>
          </div>
        ))}

      {/* Display posts from followed users */}
      {displayFollowingPost &&
        followingPosts.map((post, idx) => (
          <div key={idx}>
            <p>{post.title}</p>
            <p>
              {post.author.username} posted on{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p>{post.description}</p>
          </div>
        ))}
    </main>
  );
};

export default Dashboard;
