import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification, createNotification } from '../reducers/notificationReducer'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const handleCreateAnecdote = async (event) => {
		event.preventDefault()
		dispatch(createAnecdote(event.target.anecdote.value))
		dispatch(createNotification(`you added anecdote '${event.target.anecdote.value}'`, 5))
		event.target.reset()
		document.getElementById('filter').value = ''
		dispatch(setFilter(null))
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