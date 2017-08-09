// lib/credentails.js - mongodb credentials for MLAB database

var mongoose = require('mongoose');
var connectionString = 'mongodb://itc230:cool1MLAB!@ds125053.mlab.com:25053/scc-itc230-sm17';
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(connectionString, options);
