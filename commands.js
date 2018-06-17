"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// import * as path from 'path';
exports.generate = function (input) {
    var name = input.toLowerCase();
    var CURR_DIR = process.cwd();
    var TEMPLATE_DIR = __dirname + "/templates/";
    var API_ROOT = 'api';
    var MODEL_ROOT = 'models';
    // Create root folders.
    try {
        fs.mkdirSync(API_ROOT);
        fs.mkdirSync(MODEL_ROOT);
    }
    catch (error) {
        console.info('Root folders exist.');
    }
    // Create new input folders.
    try {
        fs.mkdirSync(API_ROOT + "/" + name);
        fs.mkdirSync(MODEL_ROOT + "/" + name);
    }
    catch (error) {
        console.info('Your new input already exists, Exiting...');
        return;
    }
    // API
    var apiFilesToCreate = fs.readdirSync(TEMPLATE_DIR + "/" + API_ROOT);
    apiFilesToCreate.forEach(function (file) {
        var origFilePath = TEMPLATE_DIR + "/" + API_ROOT + "/" + file;
        var fileStats = fs.statSync(origFilePath);
        if (fileStats.isFile()) {
            var newFileName = file.replace("blank", name);
            var writePath = CURR_DIR + "/" + API_ROOT + "/" + name + "/" + newFileName;
            var contents = fs.readFileSync(origFilePath, 'utf8');
            contents = contents.replace(/{{blank}}/g, name);
            contents = contents.replace(/{{blank_c}}/g, name.charAt(0).toUpperCase() + name.slice(1));
            fs.writeFileSync(writePath, contents, 'utf8');
        }
    });
    // MODELS
    var modelFilesToCreate = fs.readdirSync(TEMPLATE_DIR + "/" + MODEL_ROOT);
    modelFilesToCreate.forEach(function (file) {
        var origFilePath = TEMPLATE_DIR + "/" + MODEL_ROOT + "/" + file;
        var fileStats = fs.statSync(origFilePath);
        if (fileStats.isFile()) {
            var newFileName = file.replace("blank", name);
            var writePath = CURR_DIR + "/" + MODEL_ROOT + "/" + name + "/" + newFileName;
            var contents = fs.readFileSync(origFilePath, 'utf8');
            contents = contents.replace(/{{blank}}/g, name);
            contents = contents.replace(/{{blank_c}}/g, name.charAt(0).toUpperCase() + name.slice(1));
            fs.writeFileSync(writePath, contents, 'utf8');
        }
    });
    console.info(name, CURR_DIR, TEMPLATE_DIR);
};
