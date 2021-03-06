var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	concat = require('gulp-concat'),
	jsmin = require('gulp-jsmin');


// ... variables
var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR', 'ie >= 10']
};

var output = './';

gulp.task('html', function () {
	return gulp.src('./src/*.html')
		.pipe(rigger())
		.pipe(gulp.dest(output))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('js-vendor', function () {
	return gulp.src('assets/js/vendor/*.js')
		.pipe(concat('vendor.min.js'))
		.pipe(jsmin())
		.pipe(gulp.dest('assets/js/'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('css', function () {
	return gulp.src('assets/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(output))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(output))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		server: {
			baseDir: output
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('default', ['html', 'css', 'browser-sync'], function () {
	gulp.watch("assets/scss/**/*.scss", ['css']);
	gulp.watch("./src/**/*.html", ['html']);
	gulp.watch("assets/js/*.js", ['bs-reload']);
});

gulp.task('release', function () {
	return gulp.src('assets/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(output))
});
