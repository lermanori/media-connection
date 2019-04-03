var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var path = require('path');

var jsonParser = bodyParser.json()
var fs = require('fs')


let projectsArr = []


fs.readFile('memory.json',(err,data)=>{projectsArr = JSON.parse(data)})
app.use(jsonParser);


app.use(express.static('mc3/dist/spa'));

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
// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://' + host + ':' + port);
}

