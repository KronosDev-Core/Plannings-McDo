var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  scripts: {
    src: 'private/**/*.js',
    dest: 'public/js/'
  }
};

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

exports.default = scripts;