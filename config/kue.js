//setting config for parallel job handler using kue
const kue = require('kue');

const queue = kue.createQueue();

module.exports= queue;