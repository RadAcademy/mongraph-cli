"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// import * as path from 'path';
exports.generate = function (name) {
    // Create folders if they don't exist.
    fs.mkdirSync('api');
    fs.mkdirSync('models');
    console.info(name);
};
