module.exports = function(grunt) {
  grunt.config.set('mocha_istanbul', {
    coveralls: {
      src: ['test/unit', 'test/library'],
      options: {
        coverage: true,
        root: 'api/',
        reportFormats: ['cobertura', 'lcovonly']
      }
    }
  });
  grunt.loadNpmTasks('grunt-mocha-istanbul');
};

// ---
// generated by coffee-script 1.9.2
