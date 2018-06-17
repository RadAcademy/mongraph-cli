#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander = require("commander");
var commands_1 = require("./commands");
commander
    .version('1.0.0')
    .description('Mongoose / Graphql file generator');
commander
    .command('generate <name>')
    .alias('g')
    .description('Add new Mongoose Model & Interface, Graphql type & resolvers.')
    .action(function (name) {
    commands_1.generate(name);
});
commander.parse(process.argv);
