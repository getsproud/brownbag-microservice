import { Responder } from 'cote'
import { connect } from 'mongoose'

import findBy from './lib/findBy'
import findAllBy from './lib/findAllBy'
import createBrownbag from './lib/createBrownbag'
import updateBrownbag from './lib/updateBrownbag'
import deleteBrownbag from './lib/deleteBrownbag'
import participate from './lib/participate'

const PORT = 50051

try {
  const connectRetry = t => {
    let tries = t

    return connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_COLLECTION}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
      .catch(e => {
        if (tries < 5) {
          tries += 1
          setTimeout(() => connectRetry(tries), 5000)
        }

        throw new Error(e)
      })
  }

  connectRetry(0)

  const responder = new Responder({
    name: 'Brownbag Service', port: PORT, key: 'brownbag'
  })

  responder.on('findBy', findBy)
  responder.on('findAllBy', findAllBy)
  responder.on('createBrownbag', createBrownbag)
  responder.on('updateBrownbag', updateBrownbag)
  responder.on('deleteBrownbag', deleteBrownbag)
  responder.on('participate', participate)

  responder.on('liveness', () => new Promise(resolve => resolve(200)))
  responder.on('readiness', () => new Promise(resolve => resolve(200)))

  // eslint-disable-next-line
  console.log(`🤩 Feedback Microservice bound to port ${PORT}`)
} catch (e) {
  // eslint-disable-next-line
  console.error(`${e.message}`)
  throw new Error(e)
}
