import { useState } from 'react'

const StatisticLine = ({ text, value }) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all == 0) {
    return <>
      <h3>
        <p>no feedback given</p>
      </h3>
    </>
  }
  const average = (good - bad) / all
  const positive = 100 * (good / all)
  return (
    <div>
      <h3>statistics</h3>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average.toFixed(1)} />
          <StatisticLine text='positive' value={positive.toFixed(1) + '%'} />
        </tbody>
      </table>

    </div>
  )
}

const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h3>give feedback</h3>
      <div>
        <Button handleClick={() => setGood(good + 1)} label='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} label='Neutral' />
        <Button handleClick={() => setBad(bad + 1)} label='Bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App