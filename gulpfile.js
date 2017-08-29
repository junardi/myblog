// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cssNano = require('gulp-cssnano');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**', '!./app/firebase/**', '!./app/angularfire/**', '!./app/PHPMailer/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
    gulp.src('./app/js/bundled.js')
      .pipe(clean({force: true}));
});
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
    .pipe(cssNano(opts))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('styles-custom', function(){
  return gulp.src( [ 
        './app/sass/*.scss',
      ])
      .pipe( sass( { outputStyle: 'compressed' } ) )      
      .pipe(concat( 'app-custom.css' ))
      .pipe(cssNano({ safe: true }))
      .pipe(gulp.dest('./app/css/'));
});

gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('./dist/bower_components'));
});
gulp.task('copy-html-files', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/'));
});
gulp.task('browserify', function() {
  gulp.src(['./app/js/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./app/js'))
});
gulp.task('browserifyDist', function() {
  gulp.src(['./app/js/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: false
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./dist/js'))
});
gulp.task('connect', function () {
  connect.server({
    root: './app/',
    port: 8888
  });
});
gulp.task('connectDist', function () {
  connect.server({
    root: './dist/',
    port: 9999
  });
});

gulp.task('watch', function () {
  gulp.watch(['./app/js/controllers/*.js'], [ 'clean', 'browserify']);
  gulp.watch(['./app/js/*.js', '!./app/js/bundled.js'], ['clean', 'browserify']);
  gulp.watch(['./app/sass/*.scss', ], ['styles-custom']);
});


// default task
gulp.task('default',
  ['clean', 'lint', 'browserify', 'styles-custom']
);

// build task
gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['lint'], 
    ['minify-css'], 
    ['browserifyDist'], 
    ['copy-html-files'], 
    ['copy-bower-components'], 
    ['connectDist']
  );
});