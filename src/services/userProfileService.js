const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/profiles`;

// Existing function to get a single user profile by ID
const userProfile = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

// New function to get posts by multiple user IDs
const getPostsByUserIds = async (userIds) => {
  try {
    const res = await fetch(`${BASE_URL}/following`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ userIds }),
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching posts for followed users", error);
    throw error;
  }
};

export {
  userProfile,
  getPostsByUserIds, // Export the new function
};
