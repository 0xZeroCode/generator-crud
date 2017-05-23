const Promise = require('bluebird')

global.Promise = Promise;

/**
 * @callback conditionCallback
 * @return {boolean|Promise<boolean>}  condition
 */

/**
 * @callback loopBodyCallback
 * @return  {any|Promise<any>}
 */

/**
 * asynchornous while loop. good for general conditions
 * @param  {conditionCallback} condition loop condition function
 * @param  {loopBodyCallback} body      loop body
 * @return {Promise<any>}
 */
function whileLoop(condition, body) {

  return Promise.resolve(condition())
    .then(function(conditionResult) {
      if (conditionResult) {
        return Promise.resolve(body())
          .then(function() {
            return whileLoop(condition, body);
          });
      }
    });

}

module.exports = {
  whileLoop: whileLoop
};
