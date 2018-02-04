var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

var SOURCEPATH = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html'
}

var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
}
// outputStyle Options - expanded, nested, compressed, compact
gulp.task('sass', function () {
    return gulp.src(SOURCEPATH.sassSource)
        .pipe(autoprefixer())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css));
});

gulp.task('copy', function() {
    gulp.src(SOURCEPATH.htmlSource)
        .pipe(gulp.dest(APPPATH.root));
});

gulp.task('serve', ['sass'], function () {
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.jsroot + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }
    });
});

gulp.task('watch',['serve','copy'], function(){
    gulp.watch([SOURCEPATH.sassSource],['sass']);
    gulp.watch([SOURCEPATH.htmlSource],['copy']);
});

gulp.task('default', ['watch']);