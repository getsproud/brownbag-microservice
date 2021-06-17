import Brownbag from '../models/brownbag'

const findAllBy = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'brownbag',
    i18n: 'BROWNBAG_ERROR',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Brownbag.findOne(query).exec().then(brownbag => {
    message.data = brownbag

    if (!brownbag) {
      message.i18n = 'BROWNBAG_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'BROWNBAG_FOUND'
    message.code = 200

    return resolve(message)
  }).catch(err => {
    message.stack = err.stack
    message.error = err.message

    return reject(message)
  })
})

export default findAllBy
