/* jslint camelcase: false */

/*
 * Generated on 2014-05-21
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * syncright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('assemble');

    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

        config: {
            src: 'src',
            dist: 'dist',
            date: Date.now()
        },

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
                    '<%= config.src %>/scss/modules/**/*.{scss,sass}',
                    '<%= config.src %>/vendor/**/*.{scss,sass}'
                ],
                tasks: ['sass:development', 'concat:css', 'notify:scss'],
                options: {
                    spawn: false
                }
            },

            // When there will be changes in img catalogue execute task sync:development
            sync: {
                files: ['<%= config.src %>/{img,vendor,js}/**/*'],
                tasks: ['sync:img', 'sync:js', 'sync:vendor']
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

        // Compiles Sass to CSS and generates necessary files if requested
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
                options: { // Target options
                    sourceMap: true,
                    outputStyle: 'nested'
                },
                files: {
                    '<%= config.dist %>/css/style.css': '<%= config.src %>/scss/style.scss',
                }
            },
            production: {
                options: { // Target options
                    sourceMap: false,
                    outputStyle: 'compressed'
                },
                files: {
                    '<%= config.dist %>/css/style.css': '<%= config.src %>/scss/style.scss',
                }
            }
        },

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

        concat_sourcemap: {
            css: {
                src: [
                    '<%= config.dist %>/vendor/normalize-css/normalize.css',
                    '<%= config.dist %>/fonts/*.css',
                    '<%= config.dist %>/css/style.css'
                ],
                dest: '<%= config.dist %>/css/style.css',
            },
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

        csscomb: {
            scss: {
                expand: true,
                cwd: '<%= config.src %>/scss',
                src: ['**/*.scss'],
                dest: '<%= config.src %>/scss'
            }
        },

        cssmin: {
            production: {
                files: {
                    '<%= config.dist %>/css/style.css': ['<%= config.dist %>/css/style.css']
                }
            }
        },

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

        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'dist/index.html',
                }
            },
        },

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

        // Make sure code styles are up to par and there are no obvious mistakes
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

        notify: {
            scss: {
                options: {
                    title: 'SCSS',
                    message: 'Processing scss files finished',
                }
            }
        },

        scsslint: {
            options: {
                bundleExec: true,
                colorizeOutput: true,
                config: '.scss-lint.yml',
                exclude: [
                    '<%= config.src %>/scss/modules/_sprites.scss',
                    '<%= config.src %>/scss/modules/_icons.scss'
                ]
            },
            scss: [
                '<%= config.src %>/scss/**/*.scss'
            ],
        },

        sprite: {
            all: {
                src: '<%= config.src %>/img/sprites/*.png',
                destImg: '<%= config.dist %>/img/sprites-<%= config.date %>.png',
                imgPath: '../img/sprites-<%= config.date %>.png',
                cssFormat: 'css',
                destCSS: '<%= config.src %>/scss/modules/_sprites.scss'
                    // // OPTIONAL: Specify css options
                    // cssOpts: {
                    //     // Some templates allow for skipping of function declarations
                    //     functions: false,

                //     // CSS template allows for overriding of CSS selectors
                //     cssClass: function (item) {
                //         return '.sprite-' + item.name;
                //     }
                // }
            }
        },

        // Task for syncing content of img catalogue content to dest
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
            vendor: {
                expand: true,
                cwd: '<%= config.src %>/vendor',
                src: '**/*',
                dest: '<%= config.dist %>/vendor',
                verbose: true
            },
        },

        uncss: {
            production: {
                options: {
                    ignore: [/js\-.+/, /animation\-.+/]
                },
                files: {
                    '<%= config.dist %>/css/style.css': [
                        '<%= config.dist %>/index.html',
                        '<%= config.dist %>/o-nas.html'
                    ]
                }
            }
        },

        webfont: {
            icons: {
                src: '<%= config.src %>/svg/icons/*.svg',
                dest: '<%= config.dist %>/fonts',
                destCss: '<%= config.src %>/scss/modules',
                options: {
                    stylesheet: 'scss',
                    syntax: 'bem',
                    templateOptions: {
                        baseClass: 'icon',
                        classPrefix: 'icon--',
                        mixinPrefix: 'icon-'
                    },
                    relativeFontPath: '../fonts'
                }
            }
        }
    });

    grunt.registerTask('development', [
        'clean',
        'assemble',
        'jsbeautifier',
        'jshint',
        'fontgen',
        'webfont',
        'sync:img',
        'sync:js',
        'sync:vendor',
        'csscomb',
        'scsslint',
        'sass:development',
        'concat_sourcemap:css',
        'uncss:production',
        'cssmin:production',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('production', [
        'clean',
        'assemble',
        'jsbeautifier',
        'jshint',
        'fontgen',
        'webfont',
        'sync:img',
        'sync:js',
        'sync:vendor',
        'csscomb',
        'scsslint',
        'sass:production',
        'concat:css',
        'uncss:production',
        'cssmin:production'
    ]);

    grunt.registerTask('default', [
        'production'
    ]);
};
