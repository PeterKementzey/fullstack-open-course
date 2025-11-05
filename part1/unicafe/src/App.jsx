import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodButtonHandler = () => setGood(good + 1)
  const neutralButtonHandler = () => setNeutral(neutral + 1)
  const badButtonHandler = () => setBad(bad + 1)

  const getTotalValue = () => good - bad
  const getTotalVotes = () => good + neutral + bad

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={goodButtonHandler}>Good</button>
      <button onClick={neutralButtonHandler}>Neutral</button>
      <button onClick={badButtonHandler}>Bad</button>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {getTotalVotes()}</p>
      <p>Average: {getTotalValue() / getTotalVotes()}</p>
      <p>Positive: {good / getTotalVotes() * 100} %</p>
    </div>
  )
}

export default App
