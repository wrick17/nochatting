var gulp       = require('gulp');
var less       = require('gulp-less');
var watch      = require('gulp-watch');
var webpack    = require('gulp-webpack');
var notify     = require("gulp-notify");
var nodemon    = require("gulp-nodemon");
var uglify     = require('gulp-uglify');

/* Task to compile less */
gulp.task('compile-less', function() {
  gulp.src('./less/app.less')
    .pipe(less())
    .pipe(gulp.dest('./public'))
    .pipe(notify("Less Complete"));
});

gulp.task('webpack', function() {
  return gulp.src('app/index.jsx')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./public'))
    .pipe(notify("Webpack Complete"));
});

gulp.task('webpack-prod', function() {
  return gulp.src('app/index.jsx')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
});

gulp.task('compress', function() {
  return gulp.src('public/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {
  gulp.watch('./less/**/*.less' , ['compile-less']);
});

gulp.task('watch-jsx', function() {
  gulp.watch('./app/**/*.js*' , ['webpack']);
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js'
  })
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['webpack', 'compile-less', 'nodemon', 'watch-jsx', 'watch-less']);
gulp.task('prod', ['webpack-prod', 'compile-less']);
