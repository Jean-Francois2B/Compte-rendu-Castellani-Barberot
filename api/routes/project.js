const router = require("express").Router();

const Project = require("../models/Project");
const User = require("../models/User");

// Create a new project

router.post("/", async (req,res) => {
    const newProject = Project(req.body);
    try{
        const savedProject = await newProject.save();
        res.status(200).json(savedProject);
    }
    catch(err){
        return res.status(500).json(err);
    }
})

// Update a project

router.put("/:id", async (req,res) => {
    try{
        const projet = await Project.findById(req.params.id);
        if(projet.userId === req.body.userId){
            await projet.updateOne({$set:req.body});
            res.status(200).json("Your post has been updated");
        }
        else{
            res.status(403).json("you can update only your project");
        }
    }
    catch(err) {
        return res.status(500).json(err);
    }
} )

// get a project

router.get("/:id", async (req,res) => {
    try{
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    }
    catch(err){
        return res.status(500).json(err);
    }
})

// Get timeline project

router.get("/timeline/:userId", async (req,res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userProject = await Project.find({userId : currentUser._id});
        const friendProject = await Promise.all(
            currentUser.following.map((friendId) => {
                return Project.find({userId : friendId});
            })
        );
        res.status(200).json(userProject.concat(...friendProject));
    }
    
    catch(err){
        return res.status(500).json(err);
    }
})

// Get user's all posts

router.get("/profile/:username", async (req,res) => {
    try{
        const user = await User.findOne({username: req.params.username});
        const projects = await Project.find({userId: user._id});
        res.status(200).json(projects);
    }
    
    catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router