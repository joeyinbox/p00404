module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			js: {
				files: {
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
					'js/build/index.min.js': ['js/class/UserInterface.js',
											  'js/class/LogicGate.js', 
											  'js/class/DualInputGate.js', 
											  'js/class/AndGate.js', 
											  'js/class/NandGate.js', 
											  'js/class/OrGate.js', 
											  'js/class/NorGate.js', 
											  'js/class/XorGate.js', 
											  'js/class/XnorGate.js',
											  'js/class/SingleInputGate.js', 
											  'js/class/NotGate.js',
											  'js/class/Wire.js', 
											  'js/class/InputWire.js',
											  'js/class/OutputWire.js',
											  'js/class/Question.js',
											  'js/class/Quiz.js',
											  'js/index.js'],
					'js/build/build-your-own.min.js': ['js/class/UserInterface.js',
											 		   'js/class/LogicGate.js', 
											  		   'js/class/DualInputGate.js', 
											  		   'js/class/AndGate.js', 
											  		   'js/class/NandGate.js', 
											  		   'js/class/OrGate.js', 
											  		   'js/class/NorGate.js', 
											  		   'js/class/XorGate.js', 
											  		   'js/class/XnorGate.js',
											  		   'js/class/SingleInputGate.js', 
											  		   'js/class/NotGate.js',
											  		   'js/class/Wire.js', 
											  		   'js/class/InputWire.js',
											  		   'js/class/OutputWire.js',
											  		   'js/class/Question.js',
											  		   'js/class/Quiz.js',
											  		   'js/build-your-own.js'],
					'js/build/math-to-graphical.min.js': ['js/class/UserInterface.js',
											 			  'js/class/LogicGate.js', 
											  			  'js/class/DualInputGate.js', 
											  			  'js/class/AndGate.js', 
											  			  'js/class/NandGate.js', 
											  			  'js/class/OrGate.js', 
											  			  'js/class/NorGate.js', 
											  			  'js/class/XorGate.js', 
											  			  'js/class/XnorGate.js',
											  			  'js/class/SingleInputGate.js', 
											  			  'js/class/NotGate.js',
											  			  'js/class/Wire.js', 
											  			  'js/class/InputWire.js',
											  			  'js/class/OutputWire.js',
											  			  'js/class/Question.js',
											  			  'js/class/Quiz.js',
											  			  'js/math-to-graphical.js'],
					'js/build/quiz.min.js': ['js/class/UserInterface.js',
											 'js/class/LogicGate.js', 
											 'js/class/DualInputGate.js', 
											 'js/class/AndGate.js', 
											 'js/class/NandGate.js', 
											 'js/class/OrGate.js', 
											 'js/class/NorGate.js', 
											 'js/class/XorGate.js', 
											 'js/class/XnorGate.js',
											 'js/class/SingleInputGate.js', 
											 'js/class/NotGate.js',
											 'js/class/Wire.js', 
											 'js/class/InputWire.js',
											 'js/class/OutputWire.js',
											 'js/class/Question.js',
											 'js/class/Quiz.js',
											 'js/quiz.js']
				}
			}
		},
		
		watch: {
			js: {
				files: ['js/class/*.js', 'js/*.js'],
				tasks: ['concat'],
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
	grunt.registerTask('default', ['concat']);

};