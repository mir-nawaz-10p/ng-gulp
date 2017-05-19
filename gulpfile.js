'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const wiredep = require('gulp-wiredep');
const inject = require('gulp-inject');
const eslint = require('gulp-eslint');
const del = require('del');

gulp.task('clean', () => {
    del(['dist']);
});

gulp.task('js-lint', () => {
  return gulp.src(['src/**/*.js', '!node_modules/**', '!src/bower_components/**'])
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('sass', () =>  {
  return gulp.src('./src/styles/**/**.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/styles/'));
});

gulp.task('css-min', () =>  {
  return gulp.src('./src/styles/**/**.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('connect', function() {
  connect.server({
    root: ['src'],
    port: 3002,
    livereload: true
  });
});

gulp.task('html', () =>  {
  gulp.src('./src/**/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', () =>  {
  gulp.watch(['./src/app/**/*.html'], ['html']);
  gulp.watch(['./src/app/**/*.js'], ['js-lint', 'inject']);
  gulp.watch(['./src/styles/**/**.scss'], ['sass']);
});

gulp.task('inject', () =>  {
    const target = gulp.src('./src/index.html');
    const sources = gulp.src(['src/app/**/*.module.js', 'src/app/**/*.js', 'src/styles/*.css'], {read: false});
    return target
        .pipe(wiredep({devDependencies: false}))
        .pipe(inject(sources, {ignorePath: 'src'}))
        .pipe(gulp.dest('./src/'));
});

gulp.task('start', ['sass', 'connect', 'inject', 'watch']);
