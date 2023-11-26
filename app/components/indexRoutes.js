const express = require('express');

const userRoutes = require('./user/user.route');
const taskRoutes = require('./task/task.route')
const router = express.Router();

const healthCheck = (request, response) => {
    response.status(200).send({
        status: true,
    });
};

router.use('/users', userRoutes);
router.use('/task',taskRoutes);
module.exports.healthCheck = healthCheck;
module.exports.router = router;
