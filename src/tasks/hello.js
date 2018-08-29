const { taskFromPromise } = require('../helpers/webtask-helpers');
const { getValue, setValue } = require('../lib/storage');

module.exports = taskFromPromise((ctx) => {
  return getValue(ctx, 'counter')
    .then(currentCounter => {
      const counter = currentCounter ? currentCounter + 1 : 1
      return setValue(ctx, 'counter', counter)
        .then(() => ({ counter }))
    })
})
