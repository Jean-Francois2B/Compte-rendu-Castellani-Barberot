import "./topbar.css";
import { Search, Person, Chat, ExitToApp} from "@material-ui/icons";




import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";


export default function Topbar() {

    const { user } = useContext(AuthContext);
    const DP = process.env.REACT_APP_DOSSIER_PUBLIC;

    const handlerClick = () => {
        sessionStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <div className="topbar-container">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Sica</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input placeholder="Search for" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Link to="/chat" style={{ textDecoration: "none" }}>
                            <Chat />
                            <span className="topbarIconBadge">2</span>
                        </Link>
                    </div>
                    <div className="topbarIconItem">
                        <Link to="/register" style={{textDecoration: "none"}} >
                            <ExitToApp onClick={handlerClick}/>
                        </Link>
                    </div>
                </div>
                <Link to={`profile/${user.username}`}>
                    <img src={user.profilePicture ? DP + user.profilePicture : DP + "person/noAvatar.jpg  "} alt="" className="topbarImg" />
                </Link>
            </div>
        </div >
    )
}