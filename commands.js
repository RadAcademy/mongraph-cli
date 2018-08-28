"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var handlebars = require("handlebars");
var helpers_1 = require("./helpers");
exports.generate = function (input, vals) {
    var name = input.toLowerCase();
    var CURR_DIR = process.cwd();
    var TEMPLATE_ROOT = __dirname + "/templates";
    var API_ROOT = CURR_DIR + "/src/server/src/api";
    var MODEL_ROOT = CURR_DIR + "/src/server/src/models";
    var GRAPHQL_ROOT = CURR_DIR + "/src/client/graphql";
    var strings = vals.split(',');
    var values = [];
    for (var _i = 0, strings_1 = strings; _i < strings_1.length; _i++) {
        var val = strings_1[_i];
        var name_1 = val.split(':')[0].trim();
        var type_interface = helpers_1.processTypeInterface(val.split(':')[1].trim());
        var type_mongoose = helpers_1.processTypeMongoose(val.split(':')[1].trim());
        var type_gql = helpers_1.processTypeGql(val.split(':')[1].trim());
        values.push({ name: name_1, type_interface: type_interface, type_mongoose: type_mongoose, type_gql: type_gql });
    }
    var data = {
        name: name,
        name_c: name.charAt(0).toUpperCase() + name.slice(1),
        values: values
    };
    // Create root folders.
    try {
        fs.mkdirSync(API_ROOT);
        fs.mkdirSync(MODEL_ROOT);
        fs.mkdirSync(GRAPHQL_ROOT);
    }
    catch (error) {
        console.info('Root folders exist.');
    }
    // Create new input folders.
    try {
        fs.mkdirSync(API_ROOT + "/" + name);
        fs.mkdirSync(MODEL_ROOT + "/" + name);
        fs.mkdirSync(GRAPHQL_ROOT + "/" + name);
    }
    catch (error) {
        console.info('Your new input already exists, Exiting...');
        return;
    }
    // API
    var apiFilesToCreate = fs.readdirSync(TEMPLATE_ROOT + "/api");
    apiFilesToCreate.forEach(function (file) {
        // File
        var origFilePath = TEMPLATE_ROOT + "/api/" + file;
        var fileStats = fs.statSync(origFilePath);
        // Check is file
        if (fileStats.isFile()) {
            var newFileName = file.replace("blank", name);
            var writePath = API_ROOT + "/" + name + "/" + newFileName;
            var source = fs.readFileSync(origFilePath, 'utf8');
            var template = handlebars.compile(source);
            var result = template(data);
            fs.writeFileSync(writePath, result, 'utf8');
        }
    });
    // MODELS
    var modelFilesToCreate = fs.readdirSync(TEMPLATE_ROOT + "/models");
    modelFilesToCreate.forEach(function (file) {
        // File
        var origFilePath = TEMPLATE_ROOT + "/models/" + file;
        var fileStats = fs.statSync(origFilePath);
        // Check is file
        if (fileStats.isFile()) {
            var newFileName = file.replace("blank", name);
            var writePath = MODEL_ROOT + "/" + name + "/" + newFileName;
            var source = fs.readFileSync(origFilePath, 'utf8');
            var template = handlebars.compile(source);
            var result = template(data);
            fs.writeFileSync(writePath, result, 'utf8');
        }
    });
    // graphql
    var graphqlFilesToCreate = fs.readdirSync(TEMPLATE_ROOT + "/graphql");
    graphqlFilesToCreate.forEach(function (file) {
        // File
        var origFilePath = TEMPLATE_ROOT + "/graphql/" + file;
        var fileStats = fs.statSync(origFilePath);
        // Check is file
        if (fileStats.isFile()) {
            var newFileName = file.replace("blank", name);
            var writePath = GRAPHQL_ROOT + "/" + name + "/" + newFileName;
            var source = fs.readFileSync(origFilePath, 'utf8');
            var template = handlebars.compile(source);
            var result = template(data);
            fs.writeFileSync(writePath, result, 'utf8');
        }
    });
};
