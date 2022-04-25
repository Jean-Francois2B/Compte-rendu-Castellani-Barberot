import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./conversation.css"

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const DP = process.env.REACT_APP_DOSSIER_PUBLIC;

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img src={user?.profilePicture ? DP+user.profilePicture : DP+"person/noAvatar.jpg"} alt="" className="conversationImg" />
      <span className="conversationName">{user?.username}</span>

    </div>
  )
}
