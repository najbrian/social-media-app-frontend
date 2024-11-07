import React from 'react'
import { useState, useContext, useEffect } from "react";
import { AuthedUserContext } from "../../App";

import * as userProfileService from "/src/services/userProfileService";
import * as chatService from "/src/services/chatService";
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
    

    const handleCreateChat = async (mutualId) => {
      const chat = await chatService.createChat(user._id, mutualId);
      console.log('newchat', chat);
    }


  return (
    <>
    
    {/* if user clicks on a mutual, it will create new chat */}
    <p>Mutuals:</p>
    {mutuals.map((mutual, idx) => (
      <div key={idx}>
         <Link to={`/chats/${user._id}/${mutual._id}`} onClick={() => handleCreateChat(mutual._id)}>
            <p> {mutual.firstname} {mutual.lastname}</p>
         </Link>
      </div>
    ))}

  
    
    </>
  )
}

export default Chats
