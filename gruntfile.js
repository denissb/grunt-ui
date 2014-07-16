module.exports = function(grunt) {
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		coffee:{	//Task
			compile: {	//Target
				files: {	//Target options
					'dist/js/main.js' : 'coffee/main.coffee'
				}
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				mangle: {
					except: ['jQuery', 'AUI', '$']
				},
				compress: {
					drop_console: true
				}
			},
			my_target: {
				files: [{
					expand: true,
					cwd: 'dist/js',
					src: ['*.js','!_*.min.js'],
					dest: 'dist/js/min'
				}]
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: { // Map of var_name : is assignable
					jQuery: true,
					$: true,
					window: false,
					AUI: true
				},
			},
			all: ['Gruntfile.js', 'dist/js/*.js']
		},
		sass:{       // Task
			dist: {   // Target
				options: {     // Target options
					style: 'compressed',
					sourcemap: true,
					precision: 5
				},
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.scss','!_*.scss'],
					dest: 'dist/css',
					ext: '.css'
				}]
			}
		},
		csscomb: {
			dist: {
				options: {
					config: 'csscomb.json'
				},
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.scss'],
					dest: 'sass',
					ext: '.scss'
			  }]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify'); //Need to add more .js and contrib-concat
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-csscomb');
	
	grunt.registerTask('default', ['coffee','uglify','jshint','csscomb','sass']);
};
