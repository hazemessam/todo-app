// Application modules
const Task = require('../models/task');

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) res.json(task);
        else res.status(404).json({msg: "not found"});
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateTaskById = async (req, res) => {
    try {
        const options = { new: true, rurnValidatos: true }
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, options);
        if (task) res.json(task);
        else res.status(404).json({msg: "not found"});

    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteTaskById = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (task) res.json(task);
        else res.status(404).json({msg: "not found"});
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
}