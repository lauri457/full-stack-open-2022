import { useField } from "../hooks"

const CreateNew = ({ addNew }) => {
	const { reset: resetContent, ...content } = useField('text')
	const { reset: resetAuthor, ...author } = useField('text')
	const { reset: resetInfo, ...info } = useField('text')

	const handleSubmit = (e) => {
		e.preventDefault()
		addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})
	}
	const handleReset = (e) => {
		e.preventDefault()
		console.log(content)
		resetContent()
		resetAuthor()
		resetInfo()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button onClick={handleSubmit}>create</button>
				<button onClick={handleReset}>reset</button>
			</form>
		</div>
	)

}

export default CreateNew