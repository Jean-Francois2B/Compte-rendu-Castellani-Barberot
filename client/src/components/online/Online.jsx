
import "./online.css"

export default function Online({user}) {
    const DP = process.env.REACT_APP_DOSSIER_PUBLIC;
    return (
        <li className="rightbarFriends">
            <div className="rightbarProfileImgContainer">
                <img src={DP+user.profilePicture} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}
