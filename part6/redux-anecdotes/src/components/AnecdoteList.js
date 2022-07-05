import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const unsortedAnecdotes = useSelector((state) =>
		state.filter
			? state.anecdotes.filter((anecdote) =>
				anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
			)
			: state.anecdotes
	)
	const anecdotes = [...unsortedAnecdotes]
		.sort((a, b) => b.votes - a.votes)

	const dispatch = useDispatch()

	const vote = async (anecdote) => {
		dispatch(voteAnecdote(anecdote.id, {...anecdote, votes: anecdote.votes + 1}))
		dispatch(createNotification(`you voted '${anecdote.content}'`, 5))
	}

	return (
		<>
			{anecdotes
				.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							<span>has {anecdote.votes} </span>
							<button onClick={() => vote(anecdote)}>vote</button>
						</div>
					</div>
				)}
		</>
	)
}

export default AnecdoteList