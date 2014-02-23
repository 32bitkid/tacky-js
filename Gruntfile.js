module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
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
      debug: {
        src: ['tacky.js'],
        options: {
          output: 'docs/'
        }
      }
    }
  });
};