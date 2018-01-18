const gulp = require('gulp');
const browserify = require('browserify');
const path = require('path');
const source = require('vinyl-source-stream');


gulp.task('js', function() {
  const sourcefile = './js/bookmarklet.js';
  const fileName = path.basename(sourcefile);
  browserify({
    entries: [sourcefile],
  })
  .bundle()
  .pipe(source(fileName))
  .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['js', 'watch'], function() {}); 

gulp.task('watch', function() {
  gulp.watch(['./js/*js'], ['js']);
});