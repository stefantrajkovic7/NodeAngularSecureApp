const util = require('util');
const cryptos = require('crypto');

export const randomBytes = util.promisify(cryptos.randomBytes);


