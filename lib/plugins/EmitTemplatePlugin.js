const fs = require('fs');
const colors = require('colors');

class EmitTemplate {

  constructor(options) {
    this.templateDir = options.template;
    this.output = options.output;
    this.params = options.params;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('emit', (compilation, callback) => {
      fs.readFile(this.templateDir, (err, data) => {
        if (err) throw err;
        // 匹配参数替换 html 模版中变量
        let reg = new RegExp(`{{\\s*(${Object.keys(this.params).join('|')})\\s*}}`, 'g');
        let html = data.toString().replace(reg, (str, key, index) => {
          return this.params[key]
        });
        fs.writeFile(this.output, html, () => {
          console.log(colors.green('模版写入成功'));
        });
      })
    })
  }

}

module.exports = EmitTemplate;