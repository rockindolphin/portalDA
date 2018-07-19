'use strict';

const 	gulp = require('gulp'),
		path = require('path'),
		del = require('del'),
		chokidar = require('chokidar'),
		pug = require('gulp-pug'),
		miss = require('mississippi'),
		notifier = require('node-notifier'),
		w3cjs = require('gulp-w3cjs'),
		through2 = require('through2'),
		sass = require('gulp-sass'),
		rename = require('gulp-rename'),
		sourcemaps = require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer'),
		babel = require('gulp-babel'),	
		server = require('gulp-server-livereload');

var config = {
	src: {
		html:  'src/pug/*.pug',
		fonts:  'src/fonts/**/*',
		images:  'src/images/*.*',
		js: 'src/js/*.js',
		js_vendors: 'src/js/vendors/*.js',
		bootstrap_utils: 'src/css/bootstrap-4.1.2/scss/bootstrap_utils.scss',
		css: 'src/css/custom/custom.scss'
	},
	dist: {
		html:  'dist/html',
		fonts: 'dist/fonts',
		images: 'dist/images',
		js: 'dist/js',
		js_vendors: 'dist/js/vendors',
		bootstrap_utils: 'dist/css',
		css: 'dist/css'
	},
	watch: {
		html:  'src/pug/*.pug',
		fonts:  'src/fonts/**/*',
		images:  'src/images/*.*',
		js: 'src/js/*.js',
		js_vendors: 'src/js/vendors/*.js',
		bootstrap_utils: 'src/css/bootstrap-4.1.2/scss/**/*',
		css: 'src/css/custom/**/*'
	},
	browsers: ['last 2 versions','ie >= 11','> 1%'],
};


function err_log(error) {
	console.log([
		'',
		"----------ERROR MESSAGE START----------",
		("[" + error.name + " in " + error.plugin + "]"),
		error.message,
		"----------ERROR MESSAGE END----------",
		''
	].join('\n'));
	notifier.notify({ title: 'Error', message: error.plugin });
}

gulp.task('server', [], () => {
	return gulp.src( './dist' )
			.pipe( 
				server({ 
					livereload: true,
					defaultFile: 'index.html', 
					open: false, 
					directoryListing: false 
				}) 
			);                  
});

gulp.task('clean', [], () => {
	del.sync( ['./dist/**/*'] );
});

gulp.task('html', [], () => {
	miss.pipe(
		gulp.src( config.src.html ),
		pug({pretty: '\t', doctype: 'html' }),
		w3cjs(),
		through2.obj(function(file, enc, cb){
			cb(null, file);
			if (!file.w3cjs.success){
				let w3c = file.w3cjs.messages[0];
				err_log({
					name: w3c.message,
					plugin:'w3cjs',
					message:`${w3c.extract}\r\n lastLine:${w3c.lastLine}\r\n lastColumn:${w3c.lastColumn}`});
			}
		}),     
		gulp.dest( config.dist.html ), 
		(err) => {
			if (err) return err_log(err);
		}
	);
});

gulp.task('fonts', function(){
	miss.pipe(
		gulp.src( config.src.fonts ),
		gulp.dest( config.dist.fonts ), 
		(err) => {
			if (err) return err_log(err);
		}
	);			
});

gulp.task('images', function(){
	miss.pipe(
		gulp.src( config.src.images ),
		gulp.dest( config.dist.images ), 
		(err) => {
			if (err) return err_log(err);
		}
	);			
});

gulp.task('watch', function() {   
    gulp.watch(config.watch.html, ['html']);
    gulp.watch(config.watch.fonts, ['fonts']);
    gulp.watch(config.watch.images, ['images']);
});

gulp.task('js', () => {
		miss.pipe(
			gulp.src( config.src.js ),
			sourcemaps.init(),
			babel({
				presets: ['env'],
				plugins: ['es6-promise']			
			}),
			sourcemaps.write('/'),
			gulp.dest( config.dist.js ),
			(err) => {
				if (err) return err_log(err);
			}
		);
	}
);

gulp.task('js_vendors', () => {
		miss.pipe(
			gulp.src( config.src.js_vendors ),
			gulp.dest( config.dist.js_vendors ),
			(err) => {
				if (err) return err_log(err);
			}
		);
	}
);

gulp.task('css', () => {
		miss.pipe(
			gulp.src( config.src.css ),
			sourcemaps.init(),
			sass(),
			autoprefixer({
				browsers: config.browsers
			}),    
			sourcemaps.write('/'), 			
			gulp.dest( config.dist.css ),
			(err) => {
				if (err) return err_log(err);
			}
		);
	}
);

gulp.task('bootstrap_utils', () => {
		miss.pipe(
			gulp.src( config.src.bootstrap_utils ),
			sourcemaps.init(),
			sass(),
			autoprefixer({
				browsers: config.browsers
			}),    
			sourcemaps.write('/'), 			
			gulp.dest( config.dist.bootstrap_utils ),
			(err) => {
				if (err) return err_log(err);
			}
		);
	}
);

gulp.task( 'build', [
	'html', 
	'fonts', 
	'images',
	'js',
	'js_vendors'
]);

gulp.task('default', [
	'clean', 
	'build', 
	'server', 
	'watch' 
]);