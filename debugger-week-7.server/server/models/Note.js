import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Notes = new Schema({
  note: { type: String, required: true },
  bug: { type: ObjectId, required: true, ref: 'Bug' },
  reportedBy: { type: String, required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

Notes.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Notes
