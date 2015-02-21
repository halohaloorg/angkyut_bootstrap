module.exports = function (grunt) {
  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var cameraConfig = {
    dist: 'build'
  };

  grunt.initConfig({
    camera: cameraConfig,
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= camera.dist %>/**/*',
            '!<%= camera.dist %>/.git*'
          ]
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images',
          src: [
            'patterns/*.png',
            'camera_skins.png',
          ],
          dest: '<%= camera.dist %>/images'
        }]
      }
    },
    cssmin: {
      options: {
        report: 'gzip',
        keepSpecialComments: 0
      },
      dist: {
        files: {
          '<%= camera.dist %>/css/camera.min.css': [
            'css/camera.css'
          ]
        }
      }
    },
    uglify: {
      options: {
        report: 'gzip',
        preserveComments: false
      },
      dist: {
        files: {
          '<%= camera.dist %>/scripts/camera.min.js': [
            'scripts/camera.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'imagemin',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};