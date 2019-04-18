// Gruntfile.js
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    //mocha task
    mochaTest: {
      all: {
        src: ["test/*.js"],
        options: {
          run: true
        }
      }
    } //end of task
  }); // end of configuration

  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.registerTask("default", ["mochaTest"]);
};
