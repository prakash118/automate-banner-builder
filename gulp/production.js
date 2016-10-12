const gulp = require('gulp');
const vinylPaths = require('vinyl-paths');
const gulpLoadPlugins = require('gulp-load-plugins');

const plugin = gulpLoadPlugins();
const configPublic = require('../public.json');

gulp.task('html', () => {
	return gulp.src('./src/**/*.html')
		.pipe(plugin.htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./prod/'));
});

gulp.task('zip', () => {
	return gulp.src('./prod/**/*')
        .pipe(plugin.zip('banners.zip'))
        .pipe(gulp.dest('./prod/'));
});

gulp.task('map', () => {
	return gulp.src(['./prod/**/*', '!./prod/**/*.zip'])
		.pipe(plugin.directoryMap({
			filename: 'map.json'
		}))
		.pipe(gulp.dest('./prod/'));
});
