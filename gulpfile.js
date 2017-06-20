var gulp = require('gulp');
/**js plugins**/
var browserify = require('browserify');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var util = require('gulp-util');
/***didn't use***/
var rename = require('gulp-rename');
var vendor = require('gulp-concat-vendor');

/**img plugins**/
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
/**css plugins**/
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');

/**others**/
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');


gulp.task('default', ['imgs', 'css', 'html', 'js', 'webserver']);

gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'));
});
gulp.task('imgs', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});
gulp.task('css', function() {
    gulp.src('src/styles/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(concatCss('app.css'))
        /*.pipe(cleanCSS({compatibility: 'ie8'}))*/
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('build'))
});
gulp.task('js', function() {
    /*gulp.src('src/scripts/*.js')
        .pipe(gulp.dest('build/scripts'))*/
    var b = browserify({
        entries: 'src/scripts/app.js',
        debug: true,
        transform: [babelify.configure({
            presets: ['es2015', 'react']
        })]
    });
    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(concat('app.js'))
        /* .pipe(uglify())*/
        .on('error', util.log)
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('build/scripts'));
});