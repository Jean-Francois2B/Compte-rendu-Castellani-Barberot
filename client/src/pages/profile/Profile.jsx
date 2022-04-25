import axios from "axios"
import { useEffect, useState } from "react"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { useParams } from "react-router"
import "./profile.css"


export default function Profile() {
    const DP = process.env.REACT_APP_DOSSIER_PUBLIC
    const [user, setUser] = useState({});
    const username = useParams().username;
    

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src={user.coverPicture ? DP+user.coverPicture : DP +"person/noCover.jpg"} alt="" />
                            <img className="profileUserImg" src={user.profilePicture ? DP+user.profilePicture : DP +"person/noAvatar.jpg"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>

        </>
    )
}