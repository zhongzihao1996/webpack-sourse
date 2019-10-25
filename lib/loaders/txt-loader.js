const utils = require('loader-utils');

module.exports = function (source) {

  const options = utils.getOptions(this);
  source = source.replace(/\[author\]/g, options.author);

  return `export default ${JSON.stringify(source)}`;
};

