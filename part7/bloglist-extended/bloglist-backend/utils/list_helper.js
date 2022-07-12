const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.length > 0
		? blogs.map(blog => blog.likes).reduce((prev, curr) => prev + curr)
		: 0
}

const favoriteBlog = (blogs) => {
	let max = blogs.length > 0
		? Math.max(...blogs.map(object => object.likes))
		: null

	let blog = blogs.find((blog => blog.likes === max))

	return max !== null
		? {
			title: blog.title,
			author: blog.author,
			likes: blog.likes
		}
		: null
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0)
		return null

	let author = _(blogs)
		.countBy('author')
		.entries()
		.maxBy(_.last)

	return {
		author: author[0],
		blogs: author[1]
	}
}

const mostLikes = (blogs) => {
	if (blogs.length === 0)
		return null

	let author = _.map(_.groupBy(blogs, 'author'), (o, author) => { return { author: author, likes: _.sumBy(o, 'likes') } })

	return _.maxBy(author, 'likes')
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}