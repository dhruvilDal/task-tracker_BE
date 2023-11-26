const express = require('express');
const { validate } = require('../../lib/expressValidation');
const { authenticateJwt } = require("../../helpers/jwt");

const taskController = require('./task.controller');
const taskValidation = require('./task.validation');
const router = express.Router();

router.route('/')
    .post(
        authenticateJwt,
        validate(taskValidation.insertTask),
        taskController.createTask.bind(taskController),
    )

router.route('/filter')
    .post(
        authenticateJwt,
        validate(taskValidation.filterTasks),
        taskController.filterTasks.bind(taskController),
    );

router.route('/:taskId')
    .get(
        authenticateJwt,
        validate(taskValidation.getTaskById),
        taskController.getTaskById.bind(taskController),
    )
    .put(
        authenticateJwt,
        validate(taskValidation.updateTask),
        taskController.upateTaskDetails.bind(taskController),
    )
    .delete(
        authenticateJwt,
        validate(taskValidation.deleteTask),
        taskController.deleteTaskDetails.bind(taskController),
  );

module.exports = router;
