const { taskFromPromise } = require('../helpers/webtask-helpers')
const SlackApi = require('../lib/slack')
const assert = require('assert')

module.exports = taskFromPromise(async ctx => {
  assert(ctx.data.BOT_TOKEN, 'A valid bot token is required')

  SlackApi.setBotToken(ctx.data.BOT_TOKEN)

  const name = SlackApi.extractName(ctx.data.comment).toLowerCase()
  const users = await SlackApi.getUsersList()
  const user = users.find(u => u.name === name)

  if (user) {
    await SlackApi.postMessage(name, 'hello world')
  } else {
    const userChannel = await SlackApi.openIM(user.id)
    await SlackApi.postMessage(userChannel.id, 'hello world')
  }
})
