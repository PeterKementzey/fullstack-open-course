import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
}

const Statistics = ({ good, neutral, bad }) => {
  const totalValue = () => good - bad
  const totalVotes = () => good + neutral + bad

  const body = (totalVotes() == 0) ? (
    <p>No feedback given</p>
  ) : (<table><tbody>
    <StatisticLine text="Good" value={good} />
    <StatisticLine text="Neutral" value={neutral} />
    <StatisticLine text="Bad" value={bad} />
    <StatisticLine text="All" value={totalVotes()} />
    <StatisticLine text="Average" value={totalValue() / totalVotes()} />
    <StatisticLine text="Positive" value={`${good / totalVotes() * 100} %`} />
  </tbody></table>)

  return <div>
    <h1>Statistics</h1>
    {body}
  </div>
}

const Button = ({ currentValue, setValue, text }) => {
  const buttonClickHandler = () => setValue(currentValue + 1)
  return <button onClick={buttonClickHandler}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodButtonHandler = () => setGood(good + 1)
  const neutralButtonHandler = () => setNeutral(neutral + 1)
  const badButtonHandler = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button currentValue={good} setValue={setGood} text="Good" />
      <Button currentValue={neutral} setValue={setNeutral} text="Neutral" />
      <Button currentValue={bad} setValue={setBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
