import React from 'react'
import { useState, useContext, useEffect } from "react";
import { AuthedUserContext } from "../../App";

import * as userProfileService from "/src/services/userProfileService";
import { Link } from 'react-router-dom';


const Chats = () => {

    const user = useContext(AuthedUserContext);
    const [mutuals, setMutuals] = useState([]); 


    useEffect(() => {
        const fetchMutualFollowing = async () => {
          
            const { user: {followers, following }} = await userProfileService.userProfile(user._id);
    
            const mutualFollowings = following.filter(({ id }) =>
              followers.some(follower => follower.id === id)
            );

            setMutuals(mutualFollowings);
            console.log('moots', mutualFollowings)

        }
        
        if (user) fetchMutualFollowing();
    }, [user])
    
  return (
    <>
    
    <p>Mutuals:</p>
    {mutuals.map((mutual, idx) => (
      <div key={idx}>
        <p> {mutual.firstname} {mutual.lastname}</p>
      </div>
    ))}

    
    </>
  )
}

export default Chats
