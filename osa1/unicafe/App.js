import React, { useState } from 'react'

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatLine = ({text, value}) => {
  if (text === "Positive"){
    return (
      <>
      <tr>
      <td>{text}</td>
      <td> {value} %</td>
      </tr>
      </>
    )
  }
  return (
    <>
    <tr>
    <td>{text}</td>
    <td> {value}</td>
    </tr>
    </>
  )
}

const Stats = ({good,neutral,bad}) => {
  const yht = good + neutral + bad
  if (yht === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatLine text = "Good" value ={good}/>
        <StatLine text = "Neutral" value={neutral}/>
        <StatLine text = "Bad" value={bad}/>
        <StatLine text = "All" value={yht}/>
        <StatLine text = "Average"  value ={(good-bad)/yht}/>
        <StatLine text = "Positive" value ={good*100/yht}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => {
    setGood(good + 1)
  }

  const setToNeutral = () => {
    setNeutral(neutral + 1)
  }

  const setToBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1> gice feedback </h1>
      <Button handleClick={() => setToGood()} text="Good"/>
      <Button handleClick={() => setToNeutral()} text="Neutral"/>
      <Button handleClick={() => setToBad()} text="Bad"/>
      <h1> statistics </h1>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}

export default App
