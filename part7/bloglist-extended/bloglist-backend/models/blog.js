const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 1
	},
	author: String,
	url: {
		type: String,
		required: true,
		minlength: 1
	},
	likes: {
		type: Number,
		default: 0
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: {
		type: Array,
		default: []
	}
})

const Blog = mongoose.model('Blog', blogSchema)

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)
