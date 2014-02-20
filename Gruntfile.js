module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Project configuration.
  grunt.initConfig({
    uglify: {
      all: {
        files: {
          'tacky-min.js': ['tacky.js']
        }
      }
    }
  });
};