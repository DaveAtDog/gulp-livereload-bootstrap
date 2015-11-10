var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

var path = {
    source: 'src',
    build: 'dist'
};

gulp.task('dev:styles', function() {
    return sass(path.source + '/_scss/main.scss')
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(path.source + '/css'));
});


gulp.task('dev', function() {

    var server = livereload.listen();

    gulp.watch(path.source + '/_scss/**/*.scss', ['dev:styles']);

    gulp.watch(path.source + '/css/*.css').on('change', livereload.changed);

    gulp.watch(path.source + '/js/**/**/*.js').on('change', livereload.changed);

    gulp.watch(path.source + '/img/*').on('change', livereload.changed);

    gulp.watch(path.source + '/**/**/*.html').on('change', livereload.changed);
});

// Default task
gulp.task('default', function() {
    runSequence('dev:styles', ['dev']);
});