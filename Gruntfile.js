/*
 * Generated on 2014-05-21
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/**/*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/**/*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      js: {
        files: [
          '<%= config.src %>/js/**/*.js',
          'Gruntfile.js'
        ],
        tasks: ['jsbeautifier', 'jshint'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: [
          '<%= config.src %>/scss/**/*.{scss,sass}',
          '<%= config.src %>/scss/modules/**/*.{scss,sass}',
          '<%= config.src %>/vendor/**/*.{scss,sass}'
        ],
        tasks: ['compass:server'],
        options: {
          livereload: true
        }
      },

      // When there will be changes in img catalogue execute task copy:server
      copy: {
        files: ['<%= config.src %>/{img,vendor,js}/**/*'],
        tasks: ['copy:img', 'copy:js', 'copy:vendor']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/**/*.html',
          '<%= config.dist %>/**/*.css',
          '<%= config.dist %>/**/*.js',
          '<%= config.dist %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        importPath: [
          '<%= config.src %>/vendor/kicss/scss',
          '<%= config.src %>/vendor/normalize.scss'
        ]
      },
      server: {
        options: { // Target options
          sourcemap: true,
          sassDir: '<%= config.src %>/scss',
          cssDir: '<%= config.dist %>/css',
          imagesDir: '<%= config.dist %>/css',
          environment: 'development'
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-permalinks', 'assemble-contrib-sitemap'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    // Task for copying content of img catalogue content to dest
    copy: {
      img: {
        expand: true,
        cwd: '<%= config.src %>/img',
        src: '**/*.{png,jpg,svg}',
        dest: '<%= config.dist %>/img',
      },
      js: {
        expand: true,
        cwd: '<%= config.src %>/js',
        src: '**/*',
        dest: '<%= config.dist %>/js',
      },
      vendor: {
        expand: true,
        cwd: '<%= config.src %>/vendor',
        src: '**/*',
        dest: '<%= config.dist %>/vendor',
      },
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{hbs}'],

    jsbeautifier: {
      files: [
        'src/js/**/*.js',
        'Gruntfile.js'
      ],
      options: {
        js: {
          indentChar: ' ',
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '<%= config.src %>/js/**/*.js',
        'Gruntfile.js'
      ]
    },
  });

  grunt.registerTask('server', [
    'clean',
    'assemble',
    'copy:img',
    'copy:js',
    'copy:vendor',
    'compass:server',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
