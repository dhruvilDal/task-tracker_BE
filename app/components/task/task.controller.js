const TaskService = require('./task.service');
const { decodeJwtToken } = require("../../helpers/jwt");

class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }
  async createTask(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const { id } = await decodeJwtToken(token);
      const taskId = await this.taskService.createTask(id, request.body);
      response.status(200).json({ taskId });
    } catch (error) {
      next(error);
    }
  }
  async upateTaskDetails(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const { id } = await decodeJwtToken(token);
      const { taskId } = request.params;    
      const updatedTask = await this.taskService.updateTaskDetails(taskId,id, request.body);
      response.status(200).json({ updatedTask });
    } catch (error) {
      next(error)
    }
  }
  async deleteTaskDetails(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const { id } = await decodeJwtToken(token);
      const { taskId } = request.params;
      await this.taskService.deleteTask(taskId,id);
      response.status(204).json();
    } catch (error) {
      next(error);
    }
  }
  async getTaskById(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const { id } = await decodeJwtToken(token);
      const { taskId } = request.params;
      const taskDetails = await this.taskService.getTaskById(id, taskId);
      response.status(200).json(taskDetails);
    } catch (error) {
      next(error);
    }
  }

  async filterTasks(request, response, next) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const { id } = await decodeJwtToken(token);
      const filterReq = request.body;
      const userTasks = await this.taskService.filterTasks(id, filterReq);
      response.status(200).json(userTasks);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();
