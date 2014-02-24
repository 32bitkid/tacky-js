module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-docco');
  
  // Project configuration.
  grunt.initConfig({
    uglify: {
      all: {
        files: {
          'tacky-min.js': ['tacky.js']
        }
      }
    },
    docco: {
      main: {
        src: ['tacky.js'],
        options: {
          output: 'docs/'
        }
      }
    },
    jshint: {
      all: ["tacky.js"]
    }
  });

  grunt.registerTask('default', ['jshint','uglify','docco']);
};