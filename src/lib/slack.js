
const axios = require('axios')
const R = require('ramda')

const BASE_URL = 'https://slack.com/api/'
const usersListEndpoint = 'users.list'
const imOpenEndpoint = 'im.open'
const chatPostEndpoint = 'chat.postMessage'
let token = null

/* Call the given endpoing in Slack API */
const setBotToken = _token => {
  token = _token
}

const slackRequest = (endpoint, form = {}) =>
  axios.post(BASE_URL + endpoint, { ...form, token })
    .then((body = {}) => {
      if (!body.ok) throw new Error(body.error)
      return body
    })

const getUsersList = () =>
  slackRequest(usersListEndpoint)
    .then(R.prop('members'))

const openIM = userId =>
  slackRequest(imOpenEndpoint, { user: userId })
    .then(R.prop('channel'))

const postMessage = message =>
  slackRequest(chatPostEndpoint, message)

const extractName = (comment) => {
  const start = comment.indexOf('<@') + 2
  const end = comment.substr(start).indexOf('>')
  return comment.substr(start, end)
}


module.exports = {
  setBotToken,
  getUsersList,
  openIM,
  postMessage,
  extractName,
}
