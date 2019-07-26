var gulp = require("gulp"),
    uglify = require('gulp-uglify');


//只压缩JS
gulp.task('script', function() {
	// SPA部分
	//gulp.src([
	//	'script/spa/*.js'
	//])
	//	.pipe(uglify())
	//	.pipe(gulp.dest('script/spa-dist/'));
    //

	gulp.src([
			'script/lib/backbone-1.1.2.js',
			'script/lib/bootstrap-2.3.2.js',
			'script/lib/bootstrap-switch.js',
			'script/lib/bootstrap-switch.js',
		//	'script/lib/echarts-all-2.2.7.min.js',//echarts需要使用Echart专用的压缩工具压缩，echarts源码已修改过，lib-dist有echarts的压缩版
			'script/lib/html5shiv.min.js',
			'script/lib/jQuery.ajaxfileupload.js',
			'script/lib/jquery.dataTables.js',
			'script/lib/jquery.jOrgChart.js',
			'script/lib/jquery.jOrgChart-taffy.js',
			'script/lib/jquery.slimscroll.min.js',
			'script/lib/jquery.ztree.all-3.5.min.js',
			'script/lib/jquery-1.9.1.js',
			'script/lib/jquery-ui-1.11.4.js',
			'script/lib/json2.js',
			'script/lib/require.js',
			'script/lib/respond.js',
			'script/lib/text.js',
			'script/lib/TweenLite.min.js',
			'script/lib/underscore-1.8.2.min.js'
		])
		.pipe(uglify())
		.pipe(gulp.dest('script/lib-dist/'))
})



gulp.task("default", function () {
    gulp.start(["script"]);
});


