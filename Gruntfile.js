module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			js: {
				files: {
					'js/build/classes.min.js': ['js/build/classes.min.js'],
					'js/build/index.min.js': ['js/build/index.min.js'],
					'js/build/build-your-own.min.js': ['js/build/build-your-own.min.js'],
					'js/build/math-to-graphical.min.js': ['js/build/math-to-graphical.min.js'],
					'js/build/quiz.min.js': ['js/build/quiz.min.js']
				}
			}
		},
		
		concat: {   
			js: {
				files: {
					'js/build/classes.min.js': ['js/class/Function.js', 'js/class/*.js'],
					'js/build/index.min.js': ['js/build/classes.min.js', 'js/index.js'],
					'js/build/build-your-own.min.js': ['js/build/classes.min.js', 'js/build-your-own.js'],
					'js/build/math-to-graphical.min.js': ['js/build/classes.min.js', 'js/math-to-graphical.js'],
					'js/build/quiz.min.js': ['js/build/classes.min.js', 'js/quiz.js']
				}
			}
		},
		
		watch: {
			js: {
				files: ['js/class/*.js', 'js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					livereload: true,
				}
			}
		}
		
	});
	
	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify']);

};