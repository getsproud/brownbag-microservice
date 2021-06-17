import Brownbag from '../models/brownbag'

const createBrownbag = call => new Promise((resolve, reject) => {
  const { query } = call

  const message = {
    domain: 'brownbag',
    i18n: 'BROWNBAG_CREATION_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Brownbag.create(query).then(brownbag => {
    message.i18n = 'BROWNBAG_CREATION_SUCCESS'
    message.code = 200
    message.data = brownbag

    return resolve(message)
  }).catch(e => {
    message.stack = e.stack
    message.err = e.message

    return reject(message)
  })
})

export default createBrownbag
