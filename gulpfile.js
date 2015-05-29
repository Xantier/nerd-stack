'use strict';

// Imports
var debug = require('debug');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({scope: ['devDependencies'], replaceString: /\bgulp[\-.]/});
plugins.reactify = require('reactify');
plugins.browserify = require('browserify');
plugins.babelify = require('babelify');
plugins.sourceStream = require('vinyl-source-stream');
plugins.buffer = require('vinyl-buffer');

/**
 * TODO: Pull this out to somewhere where it can reside while
 * user decides what database to use.
 **/
//This is only  for  Bookshelf Dbs
gulp.task('migrate', function () {
  require('babel/register');
  require('./app/data/bookshelf/migrate')();
});

/**
 * Tasks *
 * default: Build & start server
 * dev: Build & start server. Start watching file changes and live reload browser if frontend has changed
 * debug: Run lint and tests, build and serve
 * lint: run JSHint on JS files
 **/

gulp.task('default', ['build', 'serve']);
gulp.task('build', ['scripts', 'styles']);
gulp.task('dev', ['lint', 'build', 'serve']);
gulp.task('debug', ['lint', 'runTests', 'build', 'serve']);
gulp.task('test', ['runTests']);
gulp.task('ci', ['lint', 'runTests', 'build'])

var paths = {
  server: 'run.js',
  tests: 'spec/**/*.spec.js',
  sources: ['app/**/*.js', 'app/**/*.jsx'],
  client: {
    main: './app/render/client.js',
    build: './public/build/',
    basedir: './public/javascripts/',
    ignore: './app/services/serverMediator.js'
  }
};

//run app using nodemon
gulp.task('serve', function () {
  var client = ['scripts', 'styles'];
  gulp.watch(paths.sources, client);
  gulp.watch('public/stylesheets/**/*.css', client);
  gulp.watch('views/**/*.jade', client);
  plugins.nodemon({
    script: paths.server,
    env: {
      'NODE_ENV': 'development'
    },
    watch: [paths.sources, paths.tests],
    ext: ['js', 'jsx'],
    ignore: [paths.client.sources, 'public/build/**', '*.xml', 'node_modules/**']
  })
      .on('start', ['livereload'])
      .on('change', ['livereload'])
      .on('restart', function () {
        debug.log('restarted!');
      });
});

// Run Javascript linter
gulp.task('lint', function () {
  return gulp.src(['app/**/*.js', 'spec/**/*.js', 'app.js', '!spec/coverage/**'])
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failOnError());
});

// Browserify frontend code and compile React JSX files.
gulp.task('scripts', function () {
  plugins.browserify(paths.client.main, {debug: true})
      .ignore(paths.client.ignore) //until System module loader is available
      .transform(plugins.babelify)
      .transform(plugins.reactify)
      .bundle()
      .pipe(plugins.sourceStream('js.js'))
      .pipe(plugins.buffer())
      .pipe(plugins.sourcemaps.init({loadMaps: true}))
      .pipe(plugins.uglify())
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.client.build))
      .pipe(plugins.livereload());
});

// Compile CSS file from less styles
gulp.task('styles', function () {
  gulp.src(['public/stylesheets/style.css'])
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(paths.client.build))
      .pipe(plugins.livereload());
});

// livereload browser on client app changes
gulp.task('livereload', function () {
  plugins.livereload.listen({auto: true});
});

// Run tests
gulp.task('runTests',
    plugins.jsxCoverage.createTask(
        {
          src: 'spec/**/*.spec.js',
          istanbul: {
            exclude: /node_modules|test[0-9]/,
            coverageVariable: '$$cov_' + new Date().getTime() + '$$',
            includeUntested: true
          },
          transpile: {
            babel: {
              include: /\.jsx?$/,
              exclude: /node_modules/
            }
          },
          coverage: {
            reporters: ['lcov', 'text'],
            directory: 'spec/coverage'
          },
          mocha: {
            reporter: 'spec'
          },
          babel: {
            sourceMap: 'inline'
          }
        }
    )
);

gulp.task('coveralls', function () {  
  return gulp.src('./spec/coverage/file.lcov')
    .pipe(plugins.coveralls());
});
