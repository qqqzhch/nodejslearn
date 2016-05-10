
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'public/css',
      src: ['*.css', '!*.min.css'],
      dest: 'public/css',
      ext: '.min.css'
    }]
  }
}

  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['cssmin']);

};