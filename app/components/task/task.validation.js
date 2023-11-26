const Joi = require('joi');

const taskValidationSchema = {
  id: Joi.number().min(1).required(),
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1024),
  dueDate:Joi.date().iso(),
  priority: Joi.string().valid('HIGH','MEDIUM','LOW'),
  isDone: Joi.boolean(),
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso(),
  searchTitle: Joi.string().min(1),
  sortBy: Joi.string().valid('dueDate', 'priority', 'createdAt').default('createdAt'),
};


module.exports = {
  insertTask: {
    body: Joi.object({
      title: taskValidationSchema.title,
      description: taskValidationSchema.description,
      isDone: taskValidationSchema.isDone,
      priority:taskValidationSchema.priority,
      dueDate:taskValidationSchema.dueDate,
    }),
  },
  updateTask: {
    body: Joi.object({
      title: taskValidationSchema.title,
      description: taskValidationSchema.description,
      isDone: taskValidationSchema.isDone,
      priority:taskValidationSchema.priority,
      dueDate:taskValidationSchema.dueDate,
    }), 
  },
  deleteTask: {
    params: Joi.object({
      taskId: Joi.string().hex().length(24).required(),
    }),
  },
  getTaskById: {
    params: Joi.object({
      taskId: Joi.string().hex().length(24).required(),
    })
  },
  filterTasks: {
    body: Joi.object({
      isDone: taskValidationSchema.isDone,
      searchTitle: taskValidationSchema.searchTitle,
      sortBy: taskValidationSchema.sortBy,
    }), 
  }
};
