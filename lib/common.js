'use strict';

var chalk = require('chalk');

var fatal = function (nice_msg) {
  return function (err) {
    console.log();
    console.log(nice_msg);
    console.log(
      "Try updating to the latest version:\n ",
      chalk.bold("npm update -g mlh.\n"));
    console.log(
      "If that doesn't fix it, please post the following error in:\n ",
      chalk.underline("https://github.com/anGie44/mlh-api/issues\n"));
    console.trace(err);
    console.log();
    process.exit(1);
  };
};

var error = function (nice_msg) {
  return function () {
    console.log();
    console.log(nice_msg);
    console.log();
    process.exit(1);
  };
};

var log = function () {
  console.log.apply(this, arguments);
  return arguments[0];
};

var notifyUpdate = function () {
  require('update-notifier')({
    pkg : require('../package.json')
  }).notify();
};

var notifyVersion = function () {
  if (Number(process.version.match(/^v(\d+\.\d+)/)[1]) >= 6) return;
  console.log('running node version ' + process.version + '. Need at least 6.0.0.');
  process.exit(1);
}

var extend_strings = function () {
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
};

var filter_on = function(input) { return function (x) {
  return (!input) || x.toLowerCase().indexOf(input.toLowerCase()) > -1
}}

module.exports = {
  fatal : fatal,
  error : error,
  log : log,
  notifyUpdate : notifyUpdate,
  notifyVersion : notifyVersion,
  extend_strings : extend_strings,
  filter_on : filter_on,
};