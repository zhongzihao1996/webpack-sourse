const colors = require('colors');

class FileListPlugin {

  apply(compiler) {
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
      let fileList = '生成的文件有: \n\n';
      for (let filename in fileList) {
        fileList += `- ${filename} \n`;
      }
      compilation.assets['filelist.md'] = {
        source() {
          return fileList;
        },
        size() {
          return fileList.length;
        }
      }
      callback();
    });
  }

}

module.exports = FileListPlugin;