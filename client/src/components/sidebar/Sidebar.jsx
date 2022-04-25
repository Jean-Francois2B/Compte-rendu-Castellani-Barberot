import "./sidebar.css"
import { HelpOutline, RssFeed, WorkOutline, Event, Group, School } from "@material-ui/icons"
import { Users } from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend"
import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/" style={{textDecoration:"none"}}>
                            <RssFeed className="sidebarIcon" />
                            <span className="sidebarListItemText">Feed</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/project" style={{ textDecoration: "none" }}>
                            <WorkOutline className="sidebarIcon" />
                            <span className="sidebarListItemText">Projects</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show more</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map(u => (
                        <CloseFriend key={u.id} user={u} />
                    ))}
                </ul>
            </div>

        </div>
    )
}