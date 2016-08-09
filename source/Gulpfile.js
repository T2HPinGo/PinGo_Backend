var gulp = require('gulp'),
    server = require('gulp-develop-server'),
    livereload = require('gulp-livereload');

var options = {
    path: 'server.js'
};

var serverFiles = [
    'server.js',
    './routes/**/*.js'
];

gulp.task('server:start', function() {
    server.listen(options, livereload.listen);
});

// If server scripts change, restart the server and then livereload. 
gulp.task('default', ['server:start'], function() {

    function restart(file) {
        server.changed(function(error) {
            if (!error) livereload.changed(file.path);
        });
    }

    gulp.watch(serverFiles).on('change', restart);
});
