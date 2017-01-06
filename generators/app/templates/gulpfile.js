var gulp = require('gulp'),
    //rename = require('gulp-rename'),
    rollup = require('gulp-better-rollup'),
    sourcemaps = require('gulp-sourcemaps'),
    replace = require('gulp-replace'),
    babel = require('rollup-plugin-babel');


var cfg = {
    babel: babel({
        presets: 'es2015-rollup',
        exclude: 'node_modules/**'
    }),
    format : {
        'format': 'umd',
        'moduleName': 'arch'
    }
};

// 开发环境
gulp.task('js-dev', function() {
    gulp.src('./src/main.js')
        .pipe(sourcemaps.init())
        // transform the files here. 
        .pipe(rollup({
            // any option supported by Rollup can be set here. 
            plugins: [
                cfg.babel
            ]
        }, cfg.format))
        //.pipe(replace('ENV',process.env.ENV))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./output/'));
});

// 线上环境
gulp.task('js-pub', function() {
    gulp.src('./src/main.js')
        .pipe(sourcemaps.init())
        // transform the files here. 
        .pipe(rollup({
            // any option supported by Rollup can be set here. 
            plugins: [cfg.babel]
        }, cfg.format))
        //.pipe(replace('ENV',process.env.ENV))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./output/'));
});

gulp.task('watch', function() {
    var watcher = gulp.watch('./src/**/*.js', ['js-dev']);
});

gulp.task('default', ['js-dev', 'watch']);
