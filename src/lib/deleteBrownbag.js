import Brownbag from '../models/brownbag'

const deleteBrownbag = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'brownbag',
    i18n: 'BROWNBAG_DELETION_FAILURE',
    data: null,
    code: 500,
    stack: null,
    error: null
  }

  Brownbag.findOneAndDelete(query)
    .then(brownbag => {
      if (!brownbag) {
        message.i18n = 'BROWNBAG_NOT_FOUND'
        message.code = 404

        return reject(message)
      }

      message.i18n = 'BROWNBAG_DELETION_SUCCESS'
      message.code = 204

      return resolve(message)
    }).catch(e => {
      message.stack = e.stack
      message.err = e.message

      return reject(message)
    })
})

export default deleteBrownbag
