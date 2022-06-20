"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorMiddleware = function (err, req, res, _next) {
    var status = err.status || 500;
    var message = err.message || 'There is an Erorr!';
    res.status(status).json({ status: status, message: message });
};
exports.default = errorMiddleware;
