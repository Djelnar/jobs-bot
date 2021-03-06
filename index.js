const debug = require('debug')('jobs-bot:init');
const http = require('http');
const bot = require('./bot');
const { setAllAdmins, admins } = require('./admins');
const exec = require('./commands');

// debug node_env
debug('node_env', process.env.NODE_ENV);

// set admins && set handlers messages
Promise.all(setAllAdmins())
  .then(() => bot.on('message', msg => exec(msg)))
  .then(() => debug('admins', admins))
  .then(async () => debug('bot', await bot.getMe()))
  .catch((...args) => debug('error @ init', args));

// check is polling
setInterval(() => debug('isPolling', bot.isPolling()), 60000);

// create dummy http-server
http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end('200 OK');
  })
  .listen(3000);
