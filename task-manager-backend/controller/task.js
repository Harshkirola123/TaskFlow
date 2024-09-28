const task = require('../models/Task');

async function handleCreateNewTask(req,res){
    const {title,description,dueDate,priority,status} = req.body;
    try{

        const newTask = await task.create({
            title,
            description,
            dueDate,
            priority,
            status
        })
        res.status(204).send()
    }catch(err){
        res.status(404).json(err);
    }
}

async function handleGetAllTask(req,res){
    try{
        const tasks = await task.find({});
        res.status(200).json(tasks);
    }catch(err){
        res.status(404).json(err);
    }
}

async function handleGetTaskById(req,res){
    const taskId = req.params.id;
    const {title,description,dueDate,priority,status} = req.body;
    try{
        const updateTask = await task.findByIdAndUpdate(taskId,{title,description,dueDate,priority,status},{new: true});
        if(!updateTask){
            return res.status(404).send();
        }
        res.status(200).json(updateTask);
    }catch(err){
        res.status(500).json(err);
    }
}

async function handleDeleteTask(req,res){
    const taskId = req.params.id;
    try{
        const deleteTask = await task.findByIdAndDelete(taskId);
        if(!deleteTask){
            return res.status(404).send();
        }
        res.status(204).send();
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
    handleCreateNewTask,
    handleGetAllTask,
    handleGetTaskById,
    handleDeleteTask
}