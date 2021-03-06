var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var merge = require('merge-stream');
var SOURCEPATH = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html',
    jsSource: 'src/js/*.js' // Having it as 'src/js/**' as path means everything in that folder 
}

var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js',
    fonts: 'app/fonts'
}

gulp.task('clean-htmls', function () {
    gulp.src(APPPATH.root + '/*.html', { read: false, force: true })
        .pipe(clean());
});

gulp.task('clean-scripts', function () {
    gulp.src(APPPATH.js + '/*.js', { read: false, forcr: true })
        .pipe(clean());
})

gulp.task('clean-fonts', function () {
    gulp.src(APPPATH.fonts + '/*.{eot,svg,ttf,woff,woff2}', { read: false, forcr: true })
        .pipe(clean());
})

// outputStyle Options - expanded, nested, compressed, compact
gulp.task('sass', function () {
    var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
    var sassFiles = gulp.src(SOURCEPATH.sassSource)
        .pipe(autoprefixer())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))

    merge(bootstrapCSS, sassFiles) //Order Matters - Later ones will override the previous ones
        .pipe(concat('app.css'))
        .pipe(gulp.dest(APPPATH.css));
});

gulp.task('copy-fonts', function () {
    gulp.src('./node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest(APPPATH.fonts));
});

gulp.task('copy-scripts', ['clean-scripts'], function () {
    gulp.src(SOURCEPATH.jsSource)
        .pipe(concat('main.js'))
        .pipe(browserify())
        .pipe(gulp.dest(APPPATH.js));
});

gulp.task('copy-htmls', ['clean-htmls'], function () {
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

gulp.task('watch', ['serve', 'copy-htmls', 'clean-htmls', 'copy-scripts',
    'clean-scripts', 'copy-fonts', 'clean-fonts'], function () {
        gulp.watch([SOURCEPATH.sassSource], ['sass']);
        gulp.watch([SOURCEPATH.htmlSource], ['copy-htmls']);
        gulp.watch([SOURCEPATH.jsSource], ['copy-scripts']);
    });

gulp.task('default', ['watch']);