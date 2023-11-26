const TaskModel = require('./task.model');

class TaskService {
  async createTask(userId, newTask) {
    try {
      const { title, description, isDone, dueDate } = newTask;

      const task = new TaskModel({
        userId,
        title,
        description,
        isDone: isDone || false,
        dueDate: dueDate || null,
        priority: newTask.priority || "MEDIUM",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await task.save();
      return task._id;
    } catch (error) {
      throw error;
    }
  
  }
  async updateTaskDetails(taskId, userId, updatedTaskDetails) {
    try {
      const task = await TaskModel.findOne({ _id: taskId, userId: userId });  
      if (!task) {
        throw new Error('TASK_NOT_FOUND');
      }
  
      if (updatedTaskDetails.title) {
        task.title = updatedTaskDetails.title;
      }
  
      if (updatedTaskDetails.description) {
        task.description = updatedTaskDetails.description;
      }
  
      if (updatedTaskDetails.isDone !== undefined) {
        task.isDone = updatedTaskDetails.isDone;
      }
  
      if (updatedTaskDetails.dueDate) {
        task.dueDate = updatedTaskDetails.dueDate;
      }
  
      if (updatedTaskDetails.priority) {
        task.priority = updatedTaskDetails.priority;
      }
  
      task.updatedAt = new Date();
      await task.save();
      return task;
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(taskId, userId) {
    try {
      const task = await TaskModel.findOne({ _id: taskId, userId: userId });
      if (!task) throw new Error('TASK_NOT_FOUND');
      const result = await TaskModel.deleteOne({ _id: taskId });
    } catch (error) {
      throw error;
    }
  }
  async getTaskById(userId, taskId) {
    try {
      const task = await TaskModel.findOne({ _id: taskId, userId: userId });
      if (!task) throw new Error('TASK_NOT_FOUND');
      return task;
    } catch (error) {
      throw error;
    }
  }

  async filterTasks(userId, filterReq) {
    try {
      let query = TaskModel.find({ userId: userId });

      if (filterReq.isDone !== undefined) {
          query = query.where('isDone').equals(filterReq.isDone);
      }

      if (filterReq.searchTitle) {
          query = query.where('title').regex(new RegExp(filterReq.searchTitle, 'i'));
      }

      let sortField = filterReq.sortBy;
      if (sortField && sortField !== 'priority') {
          const sortOrder = sortField === 'dueDate' ? 1 : -1;
          query = query.sort({ [sortField]: sortOrder });
      }

      const tasks = await query.exec();

      if (sortField === 'priority') {
          // Sort by priority in the application layer
          const priorityOrder = { 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
          tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      }

      return tasks;
    } catch (error) {
      throw error;
    }
  }



}

module.exports = TaskService;
