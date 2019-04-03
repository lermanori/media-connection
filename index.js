var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var path = require('path');

var jsonParser = bodyParser.json()
var fs = require('fs')


let projectsArr = []

fs.readFile('memory.json',(err,data)=>{projectsArr = JSON.parse(data)})
app.use(jsonParser);

var distPath = path.join('./','mc3','dist','spa');
app.use('/',express.static(distPath));

app.get('/projects',jsonParser,function(req,res){
    res.send(projectsArr)
});

app.post('/projects', jsonParser, function(req, res){
    let obj = req.body;
    projectsArr.push(obj)
    fs.writeFile('memory.json',JSON.stringify(projectsArr),(err,data)=>{console.log(data)})
    res.send(projectsArr)
    console.log("added to the projects")

});
app.post('/projects/:index', jsonParser, function(req, res){
    console.log(req.params);
    let obj = req.body;
    projectsArr[obj.index].project_roadmap.push(obj.entry)
    fs.writeFile('memory.json',JSON.stringify(projectsArr),(err,data)=>{console.log(data)})
    res.send(projectsArr)
    console.log("added to the roadmap");

});
app.delete('/clear', jsonParser, function(req, res){
    projectsArr = []
    fs.writeFile('memory.json',JSON.stringify(projectsArr),(err,data)=>{console.log(data)})
    res.send("cleard!")
});
var port = process.env.PORT||3000;
app.listen(port,()=>console.log(`listening on port ${port}`));

