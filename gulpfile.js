"use strict";

const gulp = require('gulp');
const pump = require('pump');
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const combinemq = require('gulp-combine-mq');
const csscomb = require('gulp-csscomb');
const minify = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const server = require('browser-sync').create();
const run = require('run-sequence');
const ghPages = require('gulp-gh-pages');

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', function() {
  return gulp.src([
    'fonts/**/*.{woff, woff2}',
    'img/**',
    'js/**',
    '*.html'
  ], {
    base: '.'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('style', function() {
  pump([
    gulp.src('sass/style.scss'),
    plumber(),
    sass().on('error', sass.logError),
    postcss([
      autoprefixer({browsers: [
        'last 2 versions',
        'safari >= 6',
        'ios >= 7',
        'ie >= 10'
      ]})
    ]),
    combinemq({beautify: true}),
    csscomb(),
    gulp.dest('build/css'),
    minify(),
    rename('style.min.css'),
    gulp.dest('build/css'),
    server.stream()
  ]);
});

gulp.task('compress', function () {
  pump([
    gulp.src('build/js/*.js'),
    uglify(),
    rename({suffix: '.min'}),
    gulp.dest('build/js-min'),
  ]);
});

gulp.task('image', function() {
  return gulp.src('build/img/**/*.{png,jpg,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function() {
  pump([
    gulp.src('build/img/icons/*.svg'),
    svgmin(),
    svgstore({inlineSvg: true}),
    rename('sprite.svg'),
    gulp.dest('build/img')
  ]);
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false
  });

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('*.html', ['html:update']);
  gulp.watch('js/*.js',['js:update']);
});

gulp.task('html:copy', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('html:update', ['html:copy'], function(done) {
  server.reload();
  done();
});

gulp.task('js:copy', function () {
  pump([
    gulp.src('js/**.js'),
    gulp.dest('build/js')
  ]);
});

gulp.task('js:update', ['js:copy', 'compress'], function (done) {
  server.reload();
  done();
});

gulp.task('deploy', function () {
  del('build');
  return gulp.src('build/**/*')
    .pipe(ghPages());
});

gulp.task('build', function(callback) {
  run(
    'clean',
    'copy',
    'style',
    'compress',
    'image',
    'sprite',
    callback
  );
});
