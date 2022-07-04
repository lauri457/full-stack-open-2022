import { useSelector, useDispatch } from "react-redux"

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

	const vote = (anecdote) => {
		dispatch({ type: 'anecdotes/increaseVoteOf', payload: anecdote.id })
		dispatch({ type: 'notification/setNotification', payload: `you voted '${anecdote.content}'` })
		dispatch({type: 'filter/setFilter', payload: null})
		setTimeout(() => dispatch({ type: 'notification/removeNotification' }), 5000)
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
							has {anecdote.votes}
							<button onClick={() => vote(anecdote)}>vote</button>
						</div>
					</div>
				)}
		</>
	)
}

export default AnecdoteList