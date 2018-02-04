var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

var SOURCEPATH = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html',
    jsSource: 'src/js/*.js' // Having it as 'src/js/**' as path means everything in that folder 
}

var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
}

gulp.task('clean-htmls', function(){
    gulp.src(APPPATH.root+'/*.html',{read: false, force:true})
        .pipe(clean());
});

gulp.task('clean-scripts', function(){
    gulp.src(APPPATH.js+'/*.js', {read: false, forcr:true})
        .pipe(clean());
})
// outputStyle Options - expanded, nested, compressed, compact
gulp.task('sass', function () {
    gulp.src(SOURCEPATH.sassSource)
        .pipe(autoprefixer())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css));
});

gulp.task('copy-scripts',['clean-scripts'], function(){
    gulp.src(SOURCEPATH.jsSource)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(APPPATH.js));
});

gulp.task('copy-htmls',['clean-htmls'], function() {
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

gulp.task('watch',['serve','copy-htmls', 'clean-htmls', 'copy-scripts', 'clean-scripts'], function(){
    gulp.watch([SOURCEPATH.sassSource],['sass']);
    gulp.watch([SOURCEPATH.htmlSource],['copy-htmls']);
    gulp.watch([SOURCEPATH.jsSource],['copy-scripts']);
});

gulp.task('default', ['watch']);