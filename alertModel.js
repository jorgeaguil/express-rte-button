import mongoose from 'mongoose'

const signalSchema = new mongoose.Schema(
  {
    signal: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('Signal', signalSchema)
