import Brownbag from '../models/brownbag'

const participate = call => new Promise((resolve, reject) => {
  const { brownbag, employee, remove } = call.query

  const message = {
    domain: 'brownbag',
    i18n: 'BROWNBAG_PARTICIPATE_FAILURE',
    data: {},
    code: 500,
    stack: null,
    error: null
  }

  Brownbag.findOne({ _id: brownbag }).exec().then(b => {
    if (!b) {
      message.i18n = 'BROWNBAG_NOT_FOUND'
      message.code = 404

      return reject(message)
    }

    if (b.participants.indexOf(employee) !== -1) {
      message.i18n = 'BROWNBAG_ALREADY_PARTICIPATING'
      message.data = b
      message.code = 400

      return reject(message)
    }

    if (!remove && (!b.spots || b.participants.length < b.spots)) {
      b.participants.push(employee)
      return b.save(() => {
        message.i18n = 'BROWNBAG_PARTICIPATE_SUCCESS'
        message.data = b
        message.code = 200

        return resolve(message)
      })
    }

    if (remove) {
      b.participants = b.participants.filter(p => p !== employee)
      return b.save(() => {
        message.i18n = 'BROWNBAG_UNPARTICIPATE_SUCCESS'
        message.data = b
        message.code = 200

        return resolve(message)
      })
    }

    message.data = b
    message.error = 'BROWNBAG_SPOTS_FULL'
    message.code = 403

    return reject(message)
  })
})

export default participate
