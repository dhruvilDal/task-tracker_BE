const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const responseGenerator = require('./app/helpers/responseGenerator');
const { router, healthCheck } = require('./app/components/indexRoutes');

require('dotenv-safe').config({ path: './config/.env', allowEmptyValues: false });
require('./app/dbHelper');

const PORT = process.env.PORT;

const app = express();
app.disable("x-powered-by");

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health-check', healthCheck);
app.use('/', router);

// catch 404 and forward to error handler
app.use((_request, response, _next) => {
    response.status(404).send(responseGenerator.getErrorResponse(new Error('NOT_FOUND')).body);
});

// other type of errors, it *might* also be a Runtime Error
app.use((err, request, response, _next) => {
    const errorResponse = responseGenerator.getErrorResponse(err, request, null);
    response.status(errorResponse.httpStatusCode || 500).send(errorResponse.body);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
module.exports = { server };

