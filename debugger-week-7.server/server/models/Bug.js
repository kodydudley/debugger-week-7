import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bugs = new Schema({
  // closed: { type: Boolean, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  reportedBy: { type: String, required: true }
  // closedDate: { type: Date }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

Bugs.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Bugs
