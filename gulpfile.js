'use strict';

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    runsequence = require('run-sequence'),
    ifElse = require('gulp-if-else'),
    argv = require('yargs').argv;
    
    
var paths = {
       src: "src/",
       dest: "dist/"
    },
    config = {};

gulp.task('browser-sync', ['set-up'], function(){
    return browserSync.init(null, {
        proxy: 'http://localhost:' + config.server.port,
        files: [paths.dest + '**/*.*'],
        port: config.server.port + 1,
        notify: false,
        injectChanges: true
    });    

});

gulp.task('nodemon', ['set-up'], function (cb) {

    var started = false;

    return nodemon({
        script: 'app.js',
        ignore: [
            'gulpfile.js',
            'node_modules/'
        ]
    }).on('start', function () {
        if (!started) {
            started = true; 
            cb();
        }
    });
});

// Styles
gulp.task('styles', ['set-up'], function() {
    return gulp.src(paths.src + 'styles/components/*.scss')
        .pipe(sass({ style: 'expanded' })).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'styles')).on('error', function(err){ console.log(err.message); })
        .pipe(rename({ suffix: '.min' })).on('error', function(err){ console.log(err.message); })
        .pipe(minifycss()).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'styles')).on('error', function(err){ console.log(err.message); })
        .pipe(browserSync.stream()).on('error', function(err){ console.log(err.message); });
});

// Fonts CSS
gulp.task('fonts-css', ['set-up'], function() {
    return gulp.src(paths.src + 'styles/fonts/**/*.css')
        .pipe(gulp.dest(paths.dest + 'styles/fonts')).on('error', function(err){ console.log(err.message); })
        .pipe(rename({ suffix: '.min' })).on('error', function(err){ console.log(err.message); })
        .pipe(minifycss({mangle: false})).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'styles/fonts')).on('error', function(err){ console.log(err.message); })
        .pipe(browserSync.stream()).on('error', function(err){ console.log(err.message); });
});

// Fonts
gulp.task('fonts', ['set-up'], function() {
    return gulp.src([paths.src + 'styles/fonts/**/*.eot', paths.src + 'styles/fonts/**/*.svg', paths.src + 'styles/fonts/**/*.ttf', paths.src + 'styles/fonts/**/*.woff', paths.src + 'styles/fonts/**/**/*'])
        .pipe(gulp.dest(paths.dest + 'styles/fonts')).on('error', function(err){ console.log(err.message); })
        .pipe(browserSync.stream()).on('error', function(err){ console.log(err.message); });
});

// Scripts
gulp.task('scripts', ['set-up'], function() {
    return gulp.src([
        paths.src + 'scripts/**/*.js',
        paths.src + 'scripts/*.js'
        ])
        .pipe(concat('app.js')).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'scripts')).on('error', function(err){ console.log(err.message); })
        .pipe(rename({ suffix: '.min' })).on('error', function(err){ console.log(err.message); })
        .pipe(
                ifElse(process.env.NODE_ENV === 'prod', 
                    uglify,
                    function(){
                        return uglify({
                            output: {
                                beautify: true
                            }
                        });
                    })
        ).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'scripts')).on('error', function(err){ console.log(err.message); })
        .pipe(browserSync.stream()).on('error', function(err){ console.log(err.message); });
});

// Images
gulp.task('images', ['set-up'], function() {
    return gulp.src([paths.src + 'images/**/*.jpeg', paths.src + 'images/**/*.jpg', paths.src + 'images/**/*.png', paths.src + 'images/**/*.gif'])
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))).on('error', function(err){ console.log(err.message); })
        .pipe(gulp.dest(paths.dest + 'images')).on('error', function(err){ console.log(err.message); })
        .pipe(browserSync.stream()).on('error', function(err){ console.log(err.message); });
});

// Clean
gulp.task('clean', ['set-up'], function() {
    return gulp.src([paths.dest + 'styles', paths.dest + 'scripts', paths.dest + 'images'], {read: false})
        .pipe(clean()).on('error', function(err){ console.log(err.message); });
});

// Watch
gulp.task('watch', ['set-up'], function() {
    
    // Watch .scss files
    gulp.watch(paths.src + 'styles/components/**/*.scss', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('styles');
    });
    
    // Watch fonts
    gulp.watch(paths.src + 'styles/fonts/**/*', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('fonts');
    });

    // Watch .js files
    gulp.watch(paths.src + 'scripts/**/*.js', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('scripts');
    });

    // Watch image files
    gulp.watch(paths.src + 'images/**/*.(jpeg|jpg|png|gif)', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('images');
    });
    
    // Watch view files
    gulp.watch('views/**/*', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        browserSync.reload();
    });
    
    
});

// Default task
gulp.task('default', function(cb){
    runsequence('set-up', 'clean', ['styles', 'scripts','images'], ['fonts','fonts-css'], 'watch', 'browser-sync', 'nodemon', cb);
});

// Build task
gulp.task('start', function(cb){
    runsequence('set-up', 'clean', ['styles', 'scripts', 'images'], ['fonts','fonts-css'], cb);
});

gulp.task('set-up', function(){
    if(argv.env){
        switch(argv.env){
            case 'dev':
            case 'stag':
            case 'prod': 
                process.env.NODE_ENV = argv.env;
                break;
            default:
                process.env.NODE_ENV = "";
        }
    }
    return config = require('./config/file');
});
