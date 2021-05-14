const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');
const sync = require('browser-sync').create();

// Styles

const styles = () => {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

const copyStyles = () => {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
}

exports.copyStyles = copyStyles;

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src([
      'source/js/global.js',
      'source/js/**/*.js'
    ])
    .pipe(sourcemap.init())
    .pipe(concat('scripts.min.js'))
    .pipe(terser())
    .pipe(sourcemap.write())
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Images

const optimizeImages = () => {
  return gulp.src([
    'source/img/**/*.{png,jpg,svg}',
    '!source/img/icons/sprite/*.svg'
    ])
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src([
    'source/img/**/*.{png,jpg,svg}'
  ])
    .pipe(gulp.dest('build/img'));
}

exports.images = copyImages;

const createWebp = () => {
  return gulp.src([
      'source/img/**/*.{png,jpg}',
      '!source/img/backgrounds/*.{png,jpg}',
      '!source/img/favicons/*.{png,jpg}',
      '!source/img/flags/flags-sprite.png',
      '!source/img/flags/flags-sprite@2x.png'
    ])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src('source/img/icons/sprite/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('icons-sprite.svg'))
    .pipe(gulp.dest('build/img/icons'));
}

exports.sprite = sprite;

// Copy

const copy = () => {
  return gulp.src([
    'source/fonts/*.{woff,woff2}',
    'source/favicons/*.{ico,webmanifest}',
    'source/img/**/*.svg',
    '!source/img/icons/sprite/*.svg',
    'source/img/**/*.{png,jpg}'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

exports.copy = copy;

// Clean

const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    browser: 'google chrome',
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  copyStyles,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyStyles,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
