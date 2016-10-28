'use strict';

var Path = require('path'),
    rootPath = Path.normalize(__dirname + '/../');

module.exports = function( env ) {
    // Define default parameters and allow extending
    var environment =  {
        port: 8080,
        url: 'localhost'
    };

    environment.rootPath = rootPath;
    environment.port = env.NODE_PORT || environment.port;
    environment.url = env.NODE_URL || environment.url;

    return environment;
};
