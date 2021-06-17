import Brownbag from '../models/brownbag'

const findAllBy = call => new Promise((resolve, reject) => {
  const { query, options, useResolve } = call

  const message = {
    domain: 'brownbag',
    i18n: 'BROWNBAG_ERROR',
    data: [],
    code: 500,
    stack: null,
    error: null
  }

  const opts = {
    page: options.page || 1,
    limit: options.limit || 12,
    pagination: options.pagination || true
  }

  Brownbag.paginate(query, opts).then(brownbags => {
    message.data = brownbags

    if (!brownbags.docs || !brownbags.docs.length) {
      message.i18n = 'BROWNBAG_NOT_FOUND'
      message.code = 404

      return !useResolve ? reject(message) : resolve(message)
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
