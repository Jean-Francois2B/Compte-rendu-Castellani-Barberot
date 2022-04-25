import "./feedProject.css";
import { Posts } from "../../dummyData";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import PostProject from "../../components/postProject/PostProject";
import ShareProject from "../../components/shareProject/ShareProject";


export default function Feed({ username }) {
    const [projects, setProjects] = useState([]);
    const { user } = useContext(AuthContext);
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight) {
            setLoadPost(true);
        }
    }


    useEffect(() => {
        const fetchProjects = async () => {
            const res = username
                ? await axios.get("/project/profile/" + username)
                : await axios.get("/project/timeline/" + user._id);
            setProjects(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        }
        fetchProjects();
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
                {(!username || username === user.username) && <ShareProject />}
                {projects.map((p) => (
                    <PostProject key={p._id} project={p} />
                ))}


            </div>
        </div>
    )
}