import React, { useContext, useEffect, useState } from 'react'
import "./post.css"
import { MoreVert } from '@material-ui/icons';
import { Link } from "react-router-dom";
import axios from 'axios';
import { format } from "timeago.js"
import { AuthContext } from '../../context/AuthContext';



export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const DP = process.env.REACT_APP_DOSSIER_PUBLIC;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        }
        catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }


    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className='postProfileImg' src={user.profilePicture ? DP + user.profilePicture : DP + "person/noAvatar.jpg"} alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <audio className='postImg' src={DP + post.audio} controls/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className='likeIcon' src={`${DP}crytos.jpg`} onClick={likeHandler} alt="" />
                        <img className='likeIcon' src={`${DP}heart.png`} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

