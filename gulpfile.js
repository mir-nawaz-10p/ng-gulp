'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const wiredep = require('gulp-wiredep');
const inject = require('gulp-inject');
const eslint = require('gulp-eslint');
const del = require('del');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const templates = require('gulp-angular-templatecache');
const minifyHTML = require('gulp-minify-html');

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

gulp.task('watch', () =>  {
  gulp.watch(['./src/app/**/*.html']).on('change', browserSync.reload);
  gulp.watch(['./src/app/**/*.js'], ['js-lint', 'inject']).on('change', browserSync.reload);
  gulp.watch(['./src/styles/**/**.scss'], ['sass']).on('change', browserSync.reload);
});

gulp.task('inject', () =>  {
    const target = gulp.src('./src/index.html');
    const sources = gulp.src(['src/app/**/*.module.js', 'src/app/**/*.js', 'src/styles/*.css'], {read: false});
    return target
        .pipe(wiredep({devDependencies: false}))
        .pipe(inject(sources, {ignorePath: 'src'}))
        .pipe(gulp.dest('./src/'));
});

gulp.task('browser-sync', () => {
    browserSync.init({
      server: { baseDir: './src' },
      browser: 'google-chrome'
    });
    browserSync.stream();
});

gulp.task('app-js', function(){
  return gulp.src(['src/app/**/*.module.js', 'src/app/**/*.js'])
      .pipe(uglify().on('error', function(e){console.log(e);}))
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./dist/js/'));
});

gulp.task('views', function () {
  gulp.src([
      './src/app/**/*.html',
      '!./node_modules/**',
      '!./src/bower_components/**'
    ])
    .pipe(minifyHTML({
      quotes: true
    }))
    .pipe(templates('views.js'))
    .pipe(gulp.dest('dist/js'));
});


gulp.task('start', ['sass', 'inject', 'watch', 'browser-sync']);

gulp.task('build', ['clean', 'css-min', 'app-js', 'views']);