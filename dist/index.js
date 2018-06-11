"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notification_server_1 = require("./notification-server");
var app = new notification_server_1.NotificationServer().getApp();
exports.app = app;
