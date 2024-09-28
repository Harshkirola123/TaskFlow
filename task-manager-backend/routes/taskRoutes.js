const express = require('express');
const router = express.Router();

const { handleCreateNewTask, handleGetAllTask, handleGetTaskById, handleDeleteTask } = require('../controller/task');

router.post('/tasks', handleCreateNewTask )

router.get('/tasks',handleGetAllTask)
router.put('/tasks/:id',handleGetTaskById);
router.delete('/tasks/:id',handleDeleteTask);

module.exports = router;