module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			js: {
				files: {
					'js/classes.min.js': ['js/class/Function.js', 'js/class/*.js']
				}
			}
		},
		
		concat: {   
			js: {
				files: {
					'js/classes.min.js': ['js/classes.min.js']
				}
			}
		},
		
		watch: {
			js: {
				files: 'js/class/*.js',
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