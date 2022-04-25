import "./shareProject.css"
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";

export default function Share() {
    const { user } = useContext(AuthContext);
    const DP = process.env.REACT_APP_DOSSIER_PUBLIC;
    const desc = useRef();
    const obj = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) =>{
        e.preventDefault()
        const newProject = {
            userId: user._id,
            obj: obj.current.value,
            desc: desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = file.name;
            data.append("file",file);
            data.append("name", fileName);
            newProject.audio = fileName;
            try{
                await axios.post("/upload", data);
                window.location.reload();
            }
            catch(err){
                console.log(err);
            }
        }
        try{
            await axios.post("/project", newProject);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture ? DP+user.profilePicture : DP +"person/noAvatar.jpg"} alt="" />
                    <input placeholder={"What's your project " +user.username + "?"} ref={desc} className="shareInput" />
                </div>
                <hr className="shareHR" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Video or Audio</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png, .jpeg, .mp3" onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="gold" className="shareIcon" />
                            <span className="shareOptionText"></span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
