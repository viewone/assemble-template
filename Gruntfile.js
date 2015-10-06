/* jslint camelcase: false */

/**
 * Gruntfile.js (Gruntfile build script)
 * Version: 0.1.0
 * Description: Gruntfile for hmtl/css ViewOne projects.
 * Author: ViewOne Sp. z o.o. http://viewone.pl/
 * Copyright: Copyright (c) 2014 ViewOne Sp. z o.o.
 * License: Available under MIT license
 */

'use strict';

module.exports = function(grunt) {

    // Load assemble
    grunt.loadNpmTasks('assemble');

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

        // Paths
        config: {
            src: 'src',
            dist: 'dist',
            date: Date.now()
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },

            assemble: {
                files: ['<%= config.src %>/{content,data,templates,partials}/**/*.{md,hbs,yml}'],
                tasks: ['assemble']
            },

            js: {
                files: [
                    '<%= config.src %>/js/**/*.js',
                    '!<%= config.src %>/js/lib/**/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['jsbeautifier', 'jshint'],
                options: {
                    spawn: false
                }
            },

            livereload: {
                files: [
                    '<%= config.dist %>/**/*.html',
                    '<%= config.dist %>/**/*.css',
                    '<%= config.dist %>/**/*.js',
                    '<%= config.dist %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },

            scss: {
                files: [
                    '<%= config.src %>/scss/**/*.{scss,sass}',
                    '<%= config.src %>/scss/objects/**/*.{scss,sass}',
                    '<%= config.src %>/vendor/**/*.{scss,sass}'
                ],
                tasks: ['sass:development', 'concat:css', 'notify:scss'],
                options: {
                    spawn: false
                }
            },

            sync: {
                files: ['<%= config.src %>/{img,vendor,js,svg}/**/*'],
                tasks: ['sync:img', 'sync:js', 'sync:svg', 'sync:vendor']
            },

            webfont: {
                files: ['<%= config.src %>/svg/icons/*'],
                tasks: ['webfont']
            },

            sprites: {
                files: ['<%= config.src %>/img/sprites/*'],
                tasks: ['sprite']
            }
        },

        // Assemble for generating html
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

        // Before generating any new files,
        // remove any previously-created files.
        clean: {
            dist: ['<%= config.dist %>/*'],
            sprite: ['<%= config.dist %>/img/sprites-*.png']
        },

        // Compiles Sass to CSS
        sass: {
            options: {
                includePaths: [
                    '<%= config.src %>/vendor/bourbon/dist',
                    '<%= config.src %>/vendor/neat/app/assets/stylesheets',
                    '<%= config.src %>/vendor/kicss/scss'
                ],
                imagePath: '<%= config.src %>/img',
            },
            development: {
                options: {
                    sourceMap: true,
                    outputStyle: 'nested'
                },
                files: {
                    '<%= config.dist %>/css/style.css': '<%= config.src %>/scss/style.scss',
                    '<%= config.dist %>/css/editor-style.css': '<%= config.src %>/scss/editor-style.scss'
                }
            },
            production: {
                options: { // Target options
                    sourceMap: false,
                    outputStyle: 'compressed'
                },
                files: {
                    '<%= config.dist %>/css/style.css': '<%= config.src %>/scss/style.scss',
                    '<%= config.dist %>/css/editor-style.css': '<%= config.src %>/scss/editor-style.scss'
                }
            }
        },

        // Concat css files
        concat: {
            css: {
                src: [
                    '<%= config.dist %>/vendor/normalize-css/normalize.css',
                    '<%= config.dist %>/fonts/*.css',
                    '<%= config.dist %>/css/style.css'
                ],
                dest: '<%= config.dist %>/css/style.css',
            },
        },

        // Concat sourcemaps files
        concat_sourcemap: {
            css: {
                src: [
                    '<%= config.dist %>/vendor/normalize-css/normalize.css',
                    '<%= config.dist %>/fonts/*.css',
                    '<%= config.dist %>/css/style.css'
                ],
                dest: '<%= config.dist %>/css/style.css',
            }
        },

        // Simple webserver
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

        // Sort and prettify scss files
        csscomb: {
            scss: {
                expand: true,
                cwd: '<%= config.src %>/scss',
                src: ['**/*.scss'],
                dest: '<%= config.src %>/scss'
            }
        },

        // Minimalize css files
        cssmin: {
            production: {
                files: {
                    '<%= config.dist %>/css/style.css': ['<%= config.dist %>/css/style.css']
                }
            }
        },

        // Generate webfonts from fonts in <%= config.src %>/fonts directory
        fontgen: {
            options: {

            },
            all: {
                options: {
                    path_prefix: '../fonts/',
                    stylesheet: '<%= config.dist %>/css/fonts.css'
                },
                files: [{
                    src: [
                        '<%= config.src %>/fonts/**/*.otf',
                        '<%= config.src %>/fonts/**/*.ttf'
                    ],
                    dest: '<%= config.dist %>/fonts'
                }]
            }
        },

        // Minimalize html files
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'dist/index.html',
                }
            }
        },

        // Prettify js files
        jsbeautifier: {
            files: [
                'src/js/**/*.js',
                'Gruntfile.js'
            ],
            options: {
                js: {
                    indentChar: ' ',
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false
                }
            }
        },

        // Validate js files and make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '<%= config.src %>/js/**/*.js',
                '!<%= config.src %>/js/lib/**/*.js',
                '!<%= config.src %>/js/app/**/*.js',
                'Gruntfile.js'
            ]
        },

        // Notify task used when scss files are compiled
        notify: {
            scss: {
                options: {
                    title: 'SCSS',
                    message: 'Processing scss files finished',
                }
            }
        },

        // Validate scss files and make sure they follow code style rules
        scsslint: {
            options: {
                bundleExec: true,
                colorizeOutput: true,
                config: '.scss-lint.yml',
                exclude: [
                    '<%= config.src %>/scss/objects/_sprites.scss',
                    '<%= config.src %>/scss/objects/_icons.scss'
                ]
            },
            scss: [
                '<%= config.src %>/scss/**/*.scss'
            ],
        },

        // Generate image with sprites and scss file using <%= config.src %>/sprite.scss.mustache template
        sprite: {
            all: {
                src: '<%= config.src %>/img/sprites/*.png',
                destImg: '<%= config.dist %>/img/sprites-<%= config.date %>.png',
                imgPath: '../img/sprites-<%= config.date %>.png',
                cssFormat: 'css',
                destCSS: '<%= config.src %>/scss/objects/_sprites.scss',
                cssTemplate: 'sprite.scss.mustache'
            }
        },

        // Sync content of img, js and vendor catalogue content to dest
        sync: {
            img: {
                expand: true,
                cwd: '<%= config.src %>/img',
                src: '**/*.{png,jpg,svg}',
                dest: '<%= config.dist %>/img',
                verbose: true
            },
            js: {
                expand: true,
                cwd: '<%= config.src %>/js',
                src: '**/*',
                dest: '<%= config.dist %>/js',
                verbose: true
            },
            svg: {
                expand: true,
                cwd: '<%= config.src %>/svg',
                src: [
                    '**/*',
                    '!icons/*'
                ],
                dest: '<%= config.dist %>/svg',
                verbose: true
            },
            vendor: {
                expand: true,
                cwd: '<%= config.src %>/vendor',
                src: '**/*',
                dest: '<%= config.dist %>/vendor',
                verbose: true
            },
        },

        // Remove unused css
        uncss: {
            production: {
                options: {
                    ignore: [/js\-.+/]
                },
                files: {
                    '<%= config.dist %>/css/style.css': [
                        '<%= config.dist %>/index.html'
                    ]
                }
            }
        },

        // Generate webfont with icons from <%= config.src %>/svg/icons catalogue
        webfont: {
            icons: {
                src: '<%= config.src %>/svg/icons/*.svg',
                dest: '<%= config.dist %>/fonts',
                destCss: '<%= config.src %>/scss/objects',
                options: {
                    stylesheet: 'scss',
                    template: 'svgicons.css',
                    syntax: 'bem',
                    templateOptions: {
                        baseClass: 'svg',
                        classPrefix: 'svg--',
                        mixinPrefix: 'svg-'
                    },
                    relativeFontPath: '../fonts'
                }
            }
        }
    });

    // Development taks
    grunt.registerTask('development', [
        'clean',
        'assemble',
        'jsbeautifier',
        'jshint',
        'fontgen',
        'webfont',
        'sprite',
        'sync:img',
        'sync:js',
        'sync:svg',
        'sync:vendor',
        'csscomb',
        'csscomb',
        'scsslint',
        'sass:development',
        'concat:css',
        'connect:livereload',
        'watch'
    ]);

    // Production taks
    grunt.registerTask('production', [
        'clean',
        'assemble',
        'jsbeautifier',
        'jshint',
        'fontgen',
        'webfont',
        'sprite',
        'sync:img',
        'sync:js',
        'sync:vendor',
        'sync:svg',
        'csscomb',
        'csscomb',
        'scsslint',
        'sass:production',
        'concat:css',
        //'uncss:production',
        'cssmin:production'
    ]);

    grunt.registerTask('default', [
        'production'
    ]);
};
