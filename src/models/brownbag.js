import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema({
  speaker: {
    type: Schema.Types.ObjectId,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    require: true,
    index: true
  },
  training: {
    type: Schema.Types.ObjectId,
    index: true
  },
  participants: [Schema.Types.ObjectId],
  categories: [Schema.Types.ObjectId],
  departments: [Schema.Types.ObjectId],
  description: {
    type: Schema.Types.String,
    required: true
  },
  title: {
    type: Schema.Types.String,
    required: true
  },
  location: {
    type: Schema.Types.String,
    required: true
  },
  fromDate: {
    type: Schema.Types.Date,
    required: true
  },
  toDate: {
    type: Schema.Types.Date,
    required: true
  }
}, { timestamps: true })

schema.plugin(mongoosePaginate)
const Brownbag = model('brownbag', schema)

export default Brownbag
