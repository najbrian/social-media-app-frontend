import React, { useState, useContext, useEffect } from "react";
import { AuthedUserContext } from "../../App";
import { Link } from 'react-router-dom';
import * as userProfileService from "/src/services/userProfileService";
import * as chatService from "/src/services/chatService";

const Chats = () => {
    const user = useContext(AuthedUserContext);
    const [mutuals, setMutuals] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchMutualFollowing = async () => {
            const { user: { followers, following } } = await userProfileService.userProfile(user._id);
            const mutualFollowings = following.filter(({ id }) =>
                followers.some(follower => follower.id === id)
            );
            setMutuals(mutualFollowings);
            console.log('Mutuals:', mutualFollowings);
        };

        if (user) fetchMutualFollowing();
    }, [user]);

    useEffect(() => {
        const fetchChats = async () => {
            const chats = await chatService.getChats(user._id);
            setChats(chats); // Store chats in state for rendering
            console.log('Chats:', chats);
        };

        if (user) fetchChats();
    }, [user]);

    const handleCreateChat = async (mutualId) => {
        const chat = await chatService.createChat(user._id, mutualId);
        console.log('New chat:', chat);
    };

    return (
        <>
            <p>Chats</p>
            {chats.length === 0 ? (
                <p>No chat history yet</p>
            ) : (
                <>
                    {chats.map((chat, idx) => {
                      // Get the other user's information from chat members
                      const otherUser = chat.members.find(member => member !== user._id);
                      return (
                        <div key={idx}>

                            <p>{otherUser.firstname} {otherUser.lastname}</p>
                    
                    
                        </div>
                      )
                      
                    })}

                </>
            )}

            {mutuals.length === 0 ? (
                <p>No mutuals available to chat.</p>
            ) : (
                <>
                    <p>Mutuals:</p>
                    {mutuals.map((mutual, idx) => (
                        <div key={idx} onClick={() => handleCreateChat(mutual._id)}>
                            <p>{mutual.firstname} {mutual.lastname}</p>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default Chats;
