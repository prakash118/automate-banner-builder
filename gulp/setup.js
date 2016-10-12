const gulp = require('gulp');
const fs = require('fs');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const gulpLoadPlugins = require('gulp-load-plugins');

const plugin = gulpLoadPlugins();
const configData = require('../public.json');

gulp.task('scaffold', () => {
	configData.dimensions.forEach(function (value, index) {
		let bannerDirectory = value;
		gulp.src('./src/template/**')
			.pipe(gulp.dest(`./src/banners/${bannerDirectory}`))
			.on('end', function () {
				updateSass(value, bannerDirectory);
				updateHtml(value, bannerDirectory);
			});
	});
});

let updateHtml = (dimension, bannerDirectory) => {
	let size = getSize(dimension);
	let filePath = `./src/banners/${bannerDirectory}/`;
	return gulp.src([`${filePath}/index.html`])
		.pipe(plugin.replace('<% width %>', `${size[0]}px`))
		.pipe(plugin.replace('<% height %>', `${size[1]}px`))
		.pipe(vinylPaths(del))
		.pipe(gulp.dest(filePath));
};

let updateSass = (dimension, bannerDirectory) => {
	let size = getSize(dimension);
	let content = getSassVariables(size);
	fs.writeFile(`./src/banners/${bannerDirectory}/style/_overwrites.scss`, content, (err)=>{
		if (err) {console.log(err);}
	});
};

let getSize = (dimension) => {
	return dimension.split('x');
};

let getSassVariables = (size) => {
	let content = `$banner-width: ${size[0]}px;\n$banner-height: ${size[1]}px;\n`;
	return content;
};

let updatePublicConfig = (dimension) => {
	if (!configData.created) { configData.created = []; }
	let size = getSize(dimension);
	configData.created.push(size[0] + 'x' + size[1]);
	fs.writeFile('./public.json', JSON.stringify(configData, null, ' '));
};
