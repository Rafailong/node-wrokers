var http = require('http');
var throng = require('throng');
var App = require('./app.js');

http.globalAgent.maxSockets = Infinity;
throng(start, { workers: 1 });

function start() {
  console.log('server.start');
  var instance = App.create();
  createServer();

  function createServer() {
    console.log('server.start.createServer');
    var server = http.createServer(instance);
    process.on('SIGTERM', shutdown);

    /**
    * Get port from environment and store in Express.
    */
    var port = normalizePort(process.env.PORT || '3000');
    instance.set('port', port);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, onListen);
    server.on('error', onError);

    function onListen() {
      console.log({ type: 'info', msg: 'listening', port: server.address().port });
    }

    function shutdown() {
      console.log({ type: 'info', msg: 'shutting down' });
      server.close(function() {
        console.log({ type: 'info', msg: 'exiting' });
        process.exit();
      });
    }

    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
      var port = parseInt(val, 10);

      if (isNaN(port)) {
        // named pipe
        return val;
      }

      if (port >= 0) {
        // port number
        return port;
      }

      return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }
  }
}