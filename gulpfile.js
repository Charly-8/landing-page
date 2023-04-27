const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require("gulp-sass")( require("sass"));
const plumber = require("gulp-plumber");

// Images
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const webp = require("gulp-webp");

// Functions

function css (done) {
    src("src/scss/**/*.scss")
        .pipe( plumber())
        .pipe( sass())
        .pipe( dest("build/css"))

    done();
}

function images (done) {
    src("images/**/*.{png, jpg}")
    .pipe( cache(imagemin ( {optimizationLevel: 3} ) ) )
    .pipe(dest ("build/img"))

    done();
}

function vwebp (done) {
    const opciones = {
        quality: 50
    }

    src("images/**/*.{jpg, png}")
        .pipe( webp(opciones) )
        .pipe( dest("build/img"))

    done();
}

function dev (done) {
    watch("src/scss/**/*.scss", css)

    done();
}

exports.css = css;
exports.images = images;
exports.vwebp = vwebp;
exports.dev = parallel(dev, images, vwebp);
