"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// import * as path from 'path';
exports.generate = function (name) {
    var CURR_DIR = process.cwd();
    var templatePath = __dirname + "/templates/";
    try {
        fs.mkdirSync('api');
        fs.mkdirSync('models');
    }
    catch (error) {
        console.info('Folders Exist');
    }
    console.info(name, CURR_DIR, templatePath);
};
