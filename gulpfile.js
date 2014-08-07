var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload');

var path = {
    source: 'www_src',
    build: 'www_dist'
};

gulp.task('styles_dev', function()
{
    var stream = gulp.src(path.source + '/scss/main.scss')
        .pipe(sass(
        {
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('www_src/css'));

    return stream;
});


gulp.task('dev', function()
{
    var server = livereload();

    gulp.watch(path.source + '/scss/**/*.scss', ['styles_dev']);

    gulp.watch(path.source + '/css/*.css').on('change', function(file)
    {
        server.changed(file.path);
    });

    gulp.watch(path.source + '/js/**/**/*.js').on('change', function(file)
    {
        server.changed(file.path);
    });

    gulp.watch(path.source + '/img/*').on('change', function(file)
    {
        server.changed(file.path);
    });

    gulp.watch(path.source + '/**/*.html').on('change', function(file)
    {
        server.changed(file.path);
    });
});

// Default task
gulp.task('default', ['dev']);