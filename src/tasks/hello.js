const { taskFromPromise } = require('../helpers/webtask-helpers')
const { getValue, setValue } = require('../lib/storage')

module.exports = taskFromPromise(async ctx => {
  const currentCounter = await getValue(ctx, 'counter')
  const counter = currentCounter ? currentCounter + 1 : 1
  await setValue(ctx, 'counter', counter)
  return { counter }
})
