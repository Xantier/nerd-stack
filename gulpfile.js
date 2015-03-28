'use strict';

// Imports
var gulp = require('gulp');
var jshint = require("gulp-jshint");
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var reactify = require('reactify');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
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
gulp.task('dev', ['build', 'serve']);
gulp.task('debug', ['lint', 'test', 'build', 'serve']);


var paths = {
   server    : 'app/config/server.js',
   tests   : 'test/**/*.js',
   sources : [ '**/*.js', '!node_modules/**', '!public/vendor/**', '!public/build/**'],
   client  : {
      main    : './app/config/render/csr.js',
      sources : './public/javascripts/**.*.js',
      build   : './public/build/',
      basedir : './public/javascripts/'
   }
};

//run app using nodemon
gulp.task('serve', function () {
   var client = ['scripts', 'styles', 'html'];
   gulp.watch(['app/**/*.js', 'app/**/*.jsx'], client);
   gulp.watch('public/stylesheets/**/*.less', client);
   gulp.watch('views/**/*.jade', client);
   nodemon({
      script: paths.server,
      env: {
         'NODE_ENV': 'development'
      },
      watch: ['*.js', '*.jsx'],
      ext: ['js', 'jsx'],
      ignore: [paths.client.sources, 'public/build/**', '*.xml']
   })
         .on('start', ['livereload'])
         .on('change', ['livereload'])
         .on('restart', function () {
            console.log('restarted!');
         });
});

// Run Javascript linter
gulp.task('lint', function () {
   gulp.src(paths.sources)
         .pipe(jshint())
         .pipe(jshint.reporter()); // Dump results
});

// Browserify frontend code and compile React JSX files.
gulp.task('scripts', function() {
   browserify(paths.client.main, {debug: true})
         .transform(babelify)
         .transform(reactify)
         .bundle()
         .pipe(source('js.js'))
         .pipe(buffer())
         .pipe(sourcemaps.init({loadMaps: true}))
         .pipe(uglify())
         .pipe(sourcemaps.write('./'))
         .pipe(gulp.dest(paths.client.build))
         .pipe(livereload());
});

// Compile CSS file from less styles
gulp.task('styles', function () {
   gulp.src(['public/stylesheets/style.less'])
         .pipe(less())
         .pipe(minifyCSS())
         .pipe(gulp.dest(paths.client.build))
         .pipe(livereload());
});

// Move HTML files to build folder
gulp.task('html', function () {
   gulp.src("public/*.html")
         .pipe(gulp.dest(paths.client.build))
         .pipe(livereload());
});

// livereload browser on client app changes
gulp.task('livereload', function(){
   livereload.listen({ auto: true });
});