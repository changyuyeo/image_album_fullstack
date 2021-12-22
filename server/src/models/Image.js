import { Schema, model, Types } from 'mongoose'

const ImageSchema = new Schema(
	{
		user: { type: Types.ObjectId, required: true, index: true },
		likes: [{ type: Types.ObjectId }],
		public: { type: Boolean, default: false },
		key: { type: String, required: true },
		originalFileName: { type: String, required: true }
	},
	{ timestamps: true }
)

export default model('image', ImageSchema)
