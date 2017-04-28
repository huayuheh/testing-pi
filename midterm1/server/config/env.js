'use strict';

var Path = require('path'),
    rootPath = Path.normalize(__dirname + '/../');

module.exports = function( env ) {
    // Define default parameters and allow extending
    var environment =  {
<<<<<<< HEAD
        port: 8100,
=======
        port: 8080,
>>>>>>> f643b95f9ce56d41f37a8638456389810482d180
        url: '10.0.1.25'
    };

    environment.rootPath = rootPath;
    environment.port = env.NODE_PORT || environment.port;
    environment.url = env.NODE_URL || environment.url;

    return environment;
};
