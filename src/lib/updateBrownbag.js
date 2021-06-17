import Brownbag from '../models/brownbag'

const updateBrownbag = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'brownbag',
    i18n: 'BROWNBAG_UPDATE_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Brownbag.findOneAndUpdate({ _id: query._id }, query, { new: true }).then(brownbag => {
    if (!brownbag) {
      message.i18n = 'BROWNBAG_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    message.i18n = 'FEEDBACK_UPDATE_SUCCESS'
    message.code = 200
    message.data = brownbag

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.error = e.message

    return reject(message)
  })
})

export default updateBrownbag
