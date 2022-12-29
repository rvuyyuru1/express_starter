/*******************************************************
 *      Server Starts From Here                        *
 *******************************************************/
'use strict';

require('dotenv').config();
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5050;
const env = process.env.ENV || 'Development';
const app_name = process.env.APP_NAME || 'Starter';
const server = http.createServer(app);
app.set('PORT_NUMBER', port);
//  Start the app on the specific interface (and port).
server.listen(port, () => {
  const data = new Date();
  console.log('\x1b[31m%s\x1b[0m', '|--------------------------------------------');
  console.log('\x1b[31m%s\x1b[0m', '|--------------------------------------------');
  console.log('\x1b[32m%s\x1b[0m', '| Server       : ' + app_name);
  console.log('\x1b[32m%s\x1b[0m', '| Environment  : ' + env);
  console.log('\x1b[32m%s\x1b[0m', '| Port         : ' + port);
  console.log('\x1b[32m%s\x1b[0m', '| link         : ' + `http://localhost:${port}`);
  console.log('\x1b[32m%s\x1b[0m', '| Date         : ' + data.toJSON().split('T').join(' '));
  console.log('\x1b[31m%s\x1b[0m', '|--------------------------------------------');
  console.log('\x1b[31m%s\x1b[0m', '|--------------------------------------------');
  console.log('\x1b[35m%s\x1b[0m', '| Waiting For Database Connection...');
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
