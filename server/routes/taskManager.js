const express = require('express')
const router = express.Router()
const Project = require('../models/project-model')
const mongoose = require('mongoose')

const middleware = (req,res,next)=>{
    if(req.user){
        next()
    }
    else{
        res.redirect('/');
    }
}

router.use(middleware);

router.get('/',function(req,res){
    Project.find({userId:req.user.id}).then((response)=>{
        console.log(response)
        res.send(response);
    })
});

router.post('/', function(req, res){
        let obj = req.body;
        obj.userId = req.user.id;
        console.log(obj);
        new Project(obj).save().then((newProject)=>{
            console.log('new project:'+newProject)
            res.send(newProject)
        })
});

router.post('/:id/entry', function(req, res){
    let obj = req.body;
    Project.findById(req.params.id).then((project)=>{
        project.project_roadmap.push(obj);
        project.save().then(()=>{
            console.log(obj);
            console.log("added to the roadmap:"+ obj);
            res.sendStatus(201)
        });
    })
});

router.get('/clear', function(req, res){
    mongoose.connection.collections.projects.drop();
    res.send("cleard!")
});

module.exports = router;
