var gulp = require('gulp');
var less = require('gulp-less');
var clean  = require('gulp-clean');
var concat = require('gulp-concat');

gulp.task('default', ['watch']);

gulp.task('watch', ['build'], function() {
  gulp.watch('./app_react/css/**', ['compact_css']);
});

gulp.task('compact_css', ['css'], function () {
  gulp.src('./public/styles/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('build', ['compact_css']);

gulp.task('css', ['clean'], function() {
  return gulp.src('./app_react/css/*.less')
    .pipe( less() )
    .pipe( gulp.dest('./public/styles') );
});

gulp.task('clean', function () {
  return gulp.src('./public/styles/*.css', { read: false })
    .pipe( clean() );
});
