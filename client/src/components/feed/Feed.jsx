import Post from "../post/Post";

import Share from "../../components/share/Share"
import "./feed.css";
import { Posts } from "../../dummyData";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight) {
            setLoadPost(true);
        }
    }


    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get("/posts/profile/" + username)
                : await axios.get("/posts/timeline/" + user._id);
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        }
        fetchPosts();
    }, [username, user._id]);

    useEffect(()=>{
        if(loadPost){
            setLoadPost(false);
            setCount(count+5);
        }
        window.addEventListener('scroll', loadMore);
        return ()=> window.removeEventListener('scroll', loadMore);
    },[loadPost, count]);




    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}


            </div>
        </div>
    )
}