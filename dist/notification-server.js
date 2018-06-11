"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var NotificationServer = /** @class */ (function () {
    function NotificationServer() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    NotificationServer.prototype.createApp = function () {
        this.app = express();
    };
    NotificationServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    NotificationServer.prototype.config = function () {
        this.port = process.env.PORT || NotificationServer.PORT;
    };
    NotificationServer.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    NotificationServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on('notification', function (n) {
                console.log('[server](notification): %s', JSON.stringify(n));
                //  this.io.sockets.to(m.to).emit('message', m)  
                console.log(n);
                _this.io.to(n.receiver).emit('notification', n);
                //this.io.emit('message', m);
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    NotificationServer.prototype.getApp = function () {
        return this.app;
    };
    NotificationServer.PORT = 9090;
    return NotificationServer;
}());
exports.NotificationServer = NotificationServer;
