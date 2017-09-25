/*
	configuration file for browserify grunt task
*/

module.exports = function(grunt) {

	grunt.config.set('browserify', {
		js: {
			// We will define which files to use
			// in tasks/pipeline.js

			src : require('../pipeline').browserifyMainFile
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
}