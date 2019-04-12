const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roadmapSchema = new Schema({
       title: String,
        date: Date,
        side: String,
        color:String,
        icon:String,
        description:String
})

const projectSchema = new Schema({
    project_name: String,
    project_person: String,
    project_due_by: Date,
    project_status: String,
    project_roadmap: [roadmapSchema] ,
    userId:String
})
const TaskManager = mongoose.model('project',projectSchema)

module.exports = TaskManager