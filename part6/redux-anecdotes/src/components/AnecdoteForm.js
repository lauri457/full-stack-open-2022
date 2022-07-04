import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const handleCreateAnecdote = (event) => {
		event.preventDefault()
		dispatch({ type: 'anecdotes/createAnecdote', payload: event.target.anecdote.value })
		dispatch({ type: 'notification/setNotification', payload: `you added anecdote '${event.target.anecdote.value}'` })
		event.target.reset()
		document.getElementById('filter').value = ''
		setTimeout(() => dispatch({ type: 'notification/removeNotification' }), 5000)
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

export default AnecdoteForm