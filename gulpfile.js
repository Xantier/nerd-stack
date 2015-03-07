'use strict';

// Imports
var gulp = require('gulp');
var jshint = require("gulp-jshint");
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var reactify = require('reactify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');

/**
 * Tasks *
 * default: Build & start server
 * dev: Build & start server. Start watching file changes and live reload browser if frontend has changed
 * debug: Run lint and tests, build and serve
 * lint: run JSHint on JS files
 **/

gulp.task('default', ['build', 'serve']);
gulp.task('build', ['scripts', 'styles', 'html']);
gulp.task('dev', ['build', 'serve', 'livereload']);
gulp.task('debug', ['lint', 'test', 'build', 'serve', 'livereload']);


var paths = {
   server    : 'config/server.js',
   tests   : 'test/**/*.js',
   sources : [ '**/*.js', '!node_modules/**', '!client/vendor/**', '!build/**'],
   client  : {
      main    : './public/javascripts/app.js',
      sources : 'client/js/**.*.js',
      build   : './public/dist/build/',
      basedir : './public/javascripts/'
   }
};

//run app using nodemon
gulp.task('serve', function () {
   nodemon({
      script: paths.server,
      env: {
         'NODE_ENV': 'development'
      }
   })
         .on('start', ['livereload'])
         .on('change', ['livereload'])
         .on('restart', function () {
            console.log('restarted!');
         });
});


gulp.task('lint', function () {
   gulp.src(paths.sources)
         .pipe(jshint())
         .pipe(jshint.reporter()); // Dump results
});

// Browserify frontend code and compile React JSX files.
gulp.task('scripts', function() {
   browserify(paths.client.main)
         .transform(reactify)
         .transform(babelify)
         .bundle()
         .pipe(source('js.js'))
         .pipe(gulp.dest(paths.client.build));
});

gulp.task('styles', function () {
   gulp.src(['public/stylesheets/style.less'])
         .pipe(less())
         .pipe(minifyCSS())
         .pipe(gulp.dest(paths.client.build))
         .pipe(livereload());
});

gulp.task('html', function () {
   gulp.src("public/*.html")
         .pipe(gulp.dest(paths.client.build))
         .pipe(livereload());
});

// livereload browser on client app changes
gulp.task('livereload', function(){
   var client = ['scripts', 'styles', 'html'];
   gulp.watch('public/javascripts/**', client);
   gulp.watch('public/stylesheets/**', client);
   gulp.watch('public/**/*.html', client);
   livereload({ auto: false });
   livereload.listen();
});