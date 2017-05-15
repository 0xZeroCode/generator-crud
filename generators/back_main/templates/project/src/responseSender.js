/**
 * [sendPromiseResult description]
 * @param  {Promise}   promise [description]
 * @param  {[type]}   req     express's req
 * @param  {[type]}   res     express's res
 * @param  {Function} next    express middleware next function
 */
function sendPromiseResult(promise, req, res, next) {

  promise.then(function(result) {

      res.send(result);

    })
    .catch(next);

}

module.exports = {
  sendPromiseResult: sendPromiseResult
};
