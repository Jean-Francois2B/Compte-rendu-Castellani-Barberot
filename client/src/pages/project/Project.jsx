import React from 'react'
import FeedProject from '../../components/feedProject/FeedProject';
import Rightbar from '../../components/rightbar/Rightbar';

import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from "../../components/topbar/Topbar";

import "./project.css"

export default function Project() {
  return (
    <>
      <Topbar />
      <div className="projectContainer">
        <Sidebar />
        <FeedProject />
        <Rightbar />
      </div>
    </>

  )
}
