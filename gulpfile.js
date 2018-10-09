var gulp = require('gulp'), gutil = require('gulp-util');;
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');

var clean = require('gulp-clean');
var Hash = require('custom-hash');
var replace = require('gulp-replace');
var imagemin = require('gulp-imagemin')
Hash.configure({maxLength:10});
gulp.task('default', ['dwa']);
var AA_cssHash;
var AA_jsHash;
var G_cssHash;
var G_jsHash;
//AMPAS
gulp.task('compileLess', function(cb){
  cssHash = Hash.digest(String(Date.now()));
	return gulp.src('src/less/*')
    .pipe(changed('web/css/*'))
    .pipe(plumber())
	  .pipe(sourcemaps.init())
	  .pipe(less())
    .on('error', function(err){
      gutil.log(err);
      this.emit('end');
    })
   // .pipe(rename({suffix:'-'+AA_cssHash}))
    .pipe(gulp.dest('web/css'))
	  .pipe(rename({suffix:'.min'}))
	  .pipe(cleanCSS({compatibility: 'ie8'}))
	  .pipe(sourcemaps.write('maps'))
	  .pipe(gulp.dest('web/css'))
    .pipe(livereload());
    
});
// gulp.task('AA_replaceCSSRef', function(){
//   return gulp.src(['ampas/src/index.php'])
//     .pipe(replace('style.css','style-'+AA_cssHash+'.min.css'))
//     .pipe(replace('scripts.js','scripts-'+AA_jsHash+'.min.js'))
//     .pipe(gulp.dest('ampas/web/'))
//     .pipe(livereload());
// })
// gulp.task('AA_replaceJSRef', function(){
//   return gulp.src(['ampas/src/index.php'])
//    .pipe(replace('style.css','style-'+AA_cssHash+'.min.css'))
//     .pipe(replace('scripts.js','scripts-'+AA_jsHash+'.min.js'))
//     .pipe(gulp.dest('ampas/web/'))
//     .pipe(livereload());
// });
gulp.task('addHash',['cleanCSS','cleanJS'],function(){
   cssHash = Hash.digest(String(Date.now()));
   jsHash = cssHash;
  gulp.src(['web/css/*','web/js/*'],{base:'web'})
  .pipe(rename({prefix:cssHash+'-'}))
  .pipe(gulp.dest('web/'))
  return gulp.src('src/index.php')
  .pipe(replace('style.css',cssHash+'-style.min.css'))
  .pipe(replace('scripts.js',jsHash+'-scripts.min.js'))
  .pipe(gulp.dest('web'))
});
gulp.task('cleanCSS', function(cb){
  return gulp.src(['web/css/*','!web/css/style.css','!web/css/style.min.css'], {read:false})
  .pipe(clean());
});
gulp.task('cleanJS', function(cb){
  return gulp.src(['web/js/*','!web/js/scripts.js','!web/js/scripts.min.js'], {read:false})
  .pipe(clean());
})
gulp.task('minify-js', function (cb) {
  jsHash = Hash.digest(String(Date.now()));
  pump([
  		  sourcemaps.init(),
        gulp.src(['src/js/*.js']),
      //  rename({suffix:'-'+AA_jsHash}),
        gulp.dest('web/js'),
        livereload(),
        uglify(),
        rename({suffix:'.min'}),
        sourcemaps.write('maps'),
        gulp.dest('web/js'),
    ],
    cb
  );
});

gulp.task('imgmin', function(){
  return gulp.src('src/img/**/*')
  .pipe(changed('web/img/'))
  .pipe(imagemin({options:{verbose:true}}))
  .pipe(gulp.dest('web/img/'))
});

gulp.task('html', function(){
  return gulp.src('src/index.php')
  // .pipe(replace('style.css','style-'+AA_cssHash+'.min.css'))
  // .pipe(replace('scripts.js','scripts-'+AA_jsHash+'.min.js'))
  .pipe(gulp.dest('web'))
  .pipe(livereload())
});

gulp.task('dwa', function() {
  livereload.listen();
  gulp.watch('src/index.php', ['html']);
  gulp.watch('src/img/**/*', ['imgmin']);
  gulp.watch('src/js/*.js', ['cleanJS','minify-js']);
  gulp.watch('src/less/*.less', ['cleanCSS','compileLess']);
});
