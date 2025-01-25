const app = require('./index');
const http = require('http');

require('dotenv').config();

const server = http.createServer(app);
server.listen(process.env.PORT);