// Подключение модулей

const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const del = require('del')

// Пути к изначальным файлам

const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}

// Задача очистки папки

function clean() {
    return del(['dist'])
}

// Задача для обработки стилей

function styles() {
    return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

// Задача для обработки скриптов

function scripts() {
    return gulp.src(paths.scripts.src, {
        sourcemaps: true
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

// Задача отслеживание стилей, скриптов

function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
    
}

// Cтроитель содержит очистку, стили и отслеживание 

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)

// Экспортируем переменные

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build