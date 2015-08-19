var gulp = require("gulp"),
    ngAnnotate = require("gulp-ng-annotate"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    autoprefixer = require('gulp-autoprefixer'),
    nodemon = require("gulp-nodemon");


gulp.task("build:lib", function () {

  gulp.src([
    "./node_modules/angular/angular.min.js",
    "./node_modules/font-awesome/css/font-awesome.min.css",
    "./node_modules/angular-ui-router/build/angular-ui-router.min.js",
    "./node_modules/angular-google-maps/dist/angular-google-maps.min.js",
    "./node_modules/lodash/index.js",
    "./bower_components/ngSmoothScroll/angular-smooth-scroll.min.js"
  ])
    .pipe(gulp.dest("./out/assets/libs"));

});

gulp.task("move:fonts", function () {

  gulp.src("./node_modules/font-awesome/fonts/**/*.*")
    .pipe(gulp.dest("./out/assets/fonts"));

});

gulp.task("build:css", function () {
  gulp.src("./src/css/all.scss")
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ["last 2 versions"]
    }))
    .pipe(gulp.dest("./out/assets/css"));

});

gulp.task("build:js", function () {
  gulp.src([
    "./src/js/gt.gmaps/**/*.js",
    "./src/js/ui/**/*.js",
    "./src/js/gt.twitter/**/*.js",
    "./src/js/app.js"

  ])
    .pipe(babel())
    .pipe(ngAnnotate())
    .pipe(concat("./app.js"))
    .pipe(gulp.dest("./out/assets/js"));

});

gulp.task("clean", function () {
  return gulp.src("./out", {read:false})
    .pipe(clean());
});

gulp.task("move:tpl", function () {

  gulp.src("./src/js/**/*.html")
    .pipe(gulp.dest("./out/assets/views"));
});

gulp.task("move:html", function () {
  gulp.src("./src/*.html")
    .pipe(gulp.dest("./out"));

  gulp.src("./src/views/**/*.html")
    .pipe(gulp.dest("./out/assets/views"));

});

gulp.task("build:js:production", function () {

  gulp.src([
    "./src/js/gt.gmaps/**/*.js",
    "./src/js/ui/**/*.js",
    "./src/js/gt.twitter/**/*.js",
    "./src/js/app.js"

  ])
    .pipe(babel())
    .pipe(ngAnnotate())
    .pipe(concat("./app.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./out/assets/js"));

});


gulp.task("serve", [
  "build:lib",
  "move:html",
  "move:tpl",
  "build:js",
  "build:css",
  "move:fonts"
], function () {

  gulp.watch("./src/**/*.html", ["move:html"]);
  gulp.watch("./src/js/**/*.js", ["build:js"]);
  gulp.watch("./src/css/**/*.scss", ["build:css"]);

  nodemon({
    script: "./gt.server.js"
  });

});

gulp.task("production", [
  "build:lib",
  "build:js:production",
  "build:css",
  "move:tpl",
  "move:html",
  "move:fonts"
], function () {

});

