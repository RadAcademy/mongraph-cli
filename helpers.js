"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
exports.processTypeInterface = function (type) {
    type = type.toLowerCase();
    if (_.includes(type, 'int')) {
        type = type.replace('int', 'number');
    }
    if (type === 'date') {
        return 'Date';
    }
    if (_.includes(type, '[]')) {
        type = type.replace('[]', '');
        return type + "[]";
    }
    if (type.charAt(0) === '[') {
        type = type.replace('[', '');
        type = type.replace(']', '');
        return type + "[]";
    }
    return type;
};
exports.processTypeMongoose = function (type) {
    type = type.toLowerCase();
    if (_.includes(type, 'int')) {
        type = type.replace('int', 'number');
    }
    if (type === 'date') {
        return 'Date';
    }
    if (type.slice(-2) === '[]') {
        type = type.replace('[]', '');
        type = type.charAt(0).toUpperCase() + type.slice(1);
        return "[" + type + "]";
    }
    if (type.charAt(0) === '[') {
        type = type.replace('[', '');
        type = type.replace(']', '');
        type = type.charAt(0).toUpperCase() + type.slice(1);
        return "[" + type + "]";
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
};
exports.processTypeGql = function (type) {
    type = type.toLowerCase();
    if (_.includes(type, 'number')) {
        type = type.replace('number', 'int');
    }
    if (type === 'date') {
        return 'Date';
    }
    if (type.slice(-2) === '[]') {
        type = type.replace('[]', '');
        type = type.charAt(0).toUpperCase() + type.slice(1);
        return "[" + type + "]";
    }
    if (type.charAt(0) === '[') {
        type = type.replace('[', '');
        type = type.replace(']', '');
        type = type.charAt(0).toUpperCase() + type.slice(1);
        return "[" + type + "]";
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
};
