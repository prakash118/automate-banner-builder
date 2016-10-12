const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const gulpLoadPlugins = require('gulp-load-plugins');

const plugin = gulpLoadPlugins();
const configPublic = require('../public.json');

gulp.task('copy', () => {
	return gulp.src(['./src/**/*.html'])
		.pipe(gulp.dest('./prod/'));
});

gulp.task('style', () => {
	return gulp.src('./src/**/style.scss')
		.pipe(plugin.if(process.env.NODE_ENV === 'production', (plugin.sass({outputStyle: 'compressed'}).on('error', plugin.sass.logError)), (plugin.sass().on('error', plugin.sass.logError))))
		.pipe(plugin.postcss([ autoprefixer() ]))
		.pipe(gulp.dest('./prod/'))
		.pipe(browserSync.stream());
});

gulp.task('script', () => {
	return gulp.src('./src/**/scripts/*.js')
		.pipe(plugin.if(process.env.NODE_ENV === 'production', plugin.uglify()))
	    .on('error', plugin.util.log)
	    .pipe(gulp.dest('./prod/'))
	    .pipe(browserSync.stream());
});

gulp.task('imagemin', () => {
	return gulp.src(['./src/**/*.png', './src/**/*.jpg'])
		.pipe(plugin.newer('./prod/'))
        .pipe(plugin.imagemin())
        .pipe(gulp.dest('./prod/'))
        .pipe(browserSync.stream());
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './prod/banners',
            directory: true
        }
    });
    gulp.watch('./src/**/*.scss', ['style']);
    gulp.watch('./src/**/*.js', ['script']);
    gulp.watch(['./src/**/*.png', './src/**/*.jpg'], ['imagemin']);
    gulp.watch('./src/**/*.html').on('change', browserSync.reload);
});
