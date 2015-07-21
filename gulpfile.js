var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

var path = {
    source: 'www_src',
    build: 'www_dist'
};

gulp.task('dev:styles', function() {
    var stream = gulp.src(path.source + '/_scss/main.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(path.source + '/css'));

    return stream;
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