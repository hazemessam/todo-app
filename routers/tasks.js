// Third party modules
const express = require('express');

// Application modules
const {createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById} = require('../controllers/tasks');

const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTaskById).patch(updateTaskById).delete(deleteTaskById);

module.exports = router;