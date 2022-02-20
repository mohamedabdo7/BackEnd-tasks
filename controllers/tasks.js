const HttpError = require("../models/http-error");

const Task = {
  id: Number,
  title: String,
  description: String,
};

let allTasks = [
  {
    id: 1,
    title: "Learn React",
    description: "Learn how to use react in building web app",
  },
  {
    id: 2,
    title: "Learn Node",
    description: "Learn how to use node in building server",
  },
  {
    id: 3,
    title: "Learn Array Manipulation",
    description: "Learn how to manipulate arrays in javascript",
  },
  {
    id: 4,
    title: "Learn Laravel",
    description: "Learn how to use laravel",
  },
  {
    id: 5,
    title: "Learn Python",
    description: "Learn how to use python",
  },
];

// Get All Tasks
const getAllTasks = async (req, res, next) => {
  let tasks = [];
  try {
    tasks = [...allTasks];
  } catch (err) {
    const error = new HttpError("Fetching tasks failed, try again!", 500);
    return next(error);
  }
  res.json({ tasks: tasks });
};

// Create Task
const createTask = async (req, res, next) => {
  const { id, title, description } = req.body;
  const createdTask = {
    id: id,
    title: title,
    description: description,
  };
  try {
    if (allTasks.filter((task) => task.id === parseInt(id)).length > 0) {
      res.status(400).json({ err: "Id already exist" });
      return next();
    } else {
      allTasks.push(createdTask);
    }
  } catch (err) {
    const error = new HttpError("Creating Task failed, try again!", 500);
    return next(error);
  }
  res.status(201).json({ task: createdTask });
};

// Get Task By id
const getTaskById = async (req, res, next) => {
  const id = parseInt(req.params.taskId);
  let task;
  try {
    task = await allTasks.find((task) => task.id === parseInt(id));
  } catch (err) {
    const error = new HttpError("no exiected tasks with this id", 500);
    return next(error);
  }
  res.json({ task });
};

// Edit a Task
const editTask = async (req, res, next) => {
  // const id = parseInt(req.params.taskId);
  const { id, title, description } = req.body;
  let updatedTask;
  try {
    updatedTask = await allTasks.find((task) => task.id === parseInt(id));
    updatedTask.id = id;
    updatedTask.title = title;
    updatedTask.description = description;
  } catch (err) {
    const error = new HttpError("no exiected tasks with this id", 500);
    return next(error);
  }
  res.json({ task: updatedTask, tasks: allTasks });
};

// Delete Task
const deleteTask = async (req, res, next) => {
  let taskId = parseInt(req.params.taskId);
  let task;
  try {
    task = await allTasks.find((task) => task.id === taskId);
    taskIndex = allTasks.indexOf(task);
  } catch (err) {
    // console.log(err);
  }

  if (!task) {
    const error = new HttpError(
      "Could not find a Task for the provided id!",
      404
    );
    return next(error);
  } else {
    allTasks.splice(taskIndex, 1);
  }

  res.json({ deletedTask: task, tasks: allTasks });
};

exports.getAllTasks = getAllTasks;
exports.createTask = createTask;
exports.getTaskById = getTaskById;
exports.editTask = editTask;
exports.deleteTask = deleteTask;
