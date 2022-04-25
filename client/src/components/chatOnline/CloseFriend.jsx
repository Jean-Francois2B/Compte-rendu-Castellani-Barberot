import "./closeFriend.css"

export default function CloseFriend({user}) {
    const DP = process.env.REACT_APP_DOSSIER_PUBLIC;
    return (
        <li className="sidebarFriend">
            <img src={DP+user.profilePicture} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}
