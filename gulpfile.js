const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
const runSequence = require('run-sequence');
const vinylPaths = require('vinyl-paths');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugin = gulpLoadPlugins();

let cleanPath;
process.env.NODE_ENV = 'development';

const setupTask = require('./gulp/setup');
const developmentTask = require('./gulp/development');
const productionTask = require('./gulp/production');
const apiTask = require('./gulp/api');

gulp.task('clean', () => {
	if (!cleanPath) { return; }
	return gulp.src(cleanPath)
		.pipe(vinylPaths(del));
});

gulp.task('setup', () => {
	cleanPath = './src/fixtures/banners';
	runSequence(
		'clean',
		'scaffold'
	);
});

gulp.task('dev', () => {
	fs.access('./src/fixtures/banners', fs.constants.F_OK, (err) => {
		if (err) { console.log(err); return; }
	});
	cleanPath = './prod';
	runSequence(
		'clean',
		'copy',
		'style',
		'script',
		'imagemin',
		'serve'
	);
});

gulp.task('prod', () => {
	process.env.NODE_ENV = 'production';
	cleanPath = './prod';
	return runSequence(
		'clean',
		'html',
		'style',
		'tinypng',
		'script',
		'zip',
		'map'
	);
});

gulp.task('default', ['dev']);
