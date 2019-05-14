//keys.js - figure out what set of credentials to return
if(process.env.NODE_ENV === 'production'){
//we are in prod
module.exports = ('./prod');
}else {
//we are not in prod
module.exports = require('./dev');

};