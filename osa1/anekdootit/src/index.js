import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Votes = (props) => (
  <div>
    has {props.votes} votes
  </div>
)
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const MostVoted = props => {
  const maxPoints = Math.max(...props.points)
  const mostVoted = (k) => k === maxPoints
  if (maxPoints === 0) {
    return (
      <div>No votes given yet</div>
    )
  }
  return (
    <div>
      {anecdotes[props.points.findIndex(mostVoted)]}
    </div>
  )

}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(0)

  const nextAnecdote = () => {
    const next = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(next)
    setVotes(points[next])
  }
  const voteAnecdote = () => {
    points[selected]++
    setVotes(points[selected])
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <Votes votes={votes} />
      <div>
        <Button handleClick={voteAnecdote} text="vote" />
        <Button handleClick={nextAnecdote} text="next anecdote" />
      </div>
      <h1>Anecdote with most votes</h1>
      <div>
        <MostVoted points={points}/>
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = new Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)