/* globals runCodeInContext: true */

var vm = Npm.require('vm');

runCodeInContext = function (code, context, filename) {
  try {
    if (context) {
      vm.runInContext(code, context, filename)
    } else {
      vm.runInThisContext(code, filename)
    }
  } catch(error) {
    log.error('The code has syntax errors.', error)
  }
}
