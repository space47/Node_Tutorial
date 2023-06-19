const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res, next) => {
  // try{
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // } catch(error){
  //     res.status(500).json({msg:error})
  // }
});

const createTask = asyncWrapper(async (req, res, next) => {
  // try {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
  // } catch (error) {
  //     res.status(500).json({msg:error})
  //     next(error)
  // }
});

const getTask = asyncWrapper(async (req, res,next) => {
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // sending to next middleWare which is ErrorHandler
    return next(createCustomError(`No task with id: ${taskID}`,404))
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
  // } catch (error) {
  //     res.status(500).json({msg:error})
  // }
});

const updateTask = asyncWrapper(async (req, res,next) => {
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`,404))
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
  // } catch (error) {
  //     res.status(500).json({msg:error})
  // }
});

const deleteTask = asyncWrapper(async (req, res,next) => {
  // try{
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`,404))
    // return res.status(404).json({ msg: `No task with id ${taskID}` });
  }
  console.log("Deleted Successfully ");
  return res.status(200).json({ task });
  // } catch (error) {
  //     res.status(500).json({msg: error})
  // }
  // res.send('delete tasks')
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
