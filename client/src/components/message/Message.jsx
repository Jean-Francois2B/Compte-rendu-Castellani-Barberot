import React, { useContext } from 'react'
import "./message.css"
import { format } from 'timeago.js'
import { AuthContext } from '../../context/AuthContext';

export default function Message({message,own}) {
  const { user } = useContext(AuthContext);
  const DP = process.env.REACT_APP_DOSSIER_PUBLIC;
  
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" src={user?.profilePicture ? DP+user.profilePicture : DP+"person/noAvatar.jpg"} alt="" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">
            {format(message.createdAt)}
        </div>
    </div>
  )
}


