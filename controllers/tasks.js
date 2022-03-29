// Application modules
const { AsyncWrapper, CustomError } = require('../errors');
const Task = require('../models/task');


const createTask = AsyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
});


const getAllTasks = AsyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});


const getTaskById = AsyncWrapper(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) throw new CustomError('Not found', 404);
    res.json(task)
});


const updateTaskById = AsyncWrapper(async (req, res) => {
    const options = { new: true, rurnValidatos: true }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, options);
    if (!task) throw new CustomError('Not found', 404);
    res.json(task);
});


const deleteTaskById = AsyncWrapper(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) throw new CustomError('Not found', 404);
    res.json(task);
});


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
}
