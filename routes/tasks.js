const express = require("express");
const tasksController = require("../controllers/tasks");

const router = express.Router();

router.get("/", tasksController.getAllTasks);
router.post("/", tasksController.createTask);
router.get("/:taskId", tasksController.getTaskById);
router.put("/", tasksController.editTask);
router.delete("/:taskId", tasksController.deleteTask);

module.exports = router;
