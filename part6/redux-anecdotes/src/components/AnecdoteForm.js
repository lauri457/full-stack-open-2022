import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
	const handleCreateAnecdote = (event) => {
		event.preventDefault()
		props.createAnecdote(event.target.anecdote.value)
		props.createNotification(`you added anecdote '${event.target.anecdote.value}'`, 5)
		event.target.reset()
		document.getElementById('filter').value = ''
		props.setFilter(null)
	}

	return (
		<>
			<h2>create new</h2>
			<form id='create-anecdote' onSubmit={handleCreateAnecdote}>
				<div><input name='anecdote' /></div>
				<button>create</button>
			</form>
		</>
	)
}

const mapDispatchToProps = {
	createAnecdote,
	createNotification,
	setFilter
}

const mapStateToProps = (state) => {
	return {
		filter: state.filter
	}
}

const ConnectedAnecdoteForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm