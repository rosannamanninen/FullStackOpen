import React, { useState } from 'react'


const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Anecdote = ({text}) => (
  <p>{text}</p>
)

const Vote = ({number}) => (
  <p>Has votes {number}</p>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])

  const [selected, setSelected] = useState(0)

  const [popular, setPopular] = useState(0)

  const newAnecdote = () => {
    console.log('ines')
    let num = Math.floor(Math.random()* 10)
    while (num > 6){
      num = Math.floor(Math.random()* 10)
    }
    setSelected(num)

  }

  const voteAnecdote = (selection) => {
    let newar = []
    for (let i = 0;i < 7;i++) {
      if (i === selection) {
        newar =newar.concat(votes[i] + 1)
      }
      else {
        newar = newar.concat(votes[i])
      }
    }

    if (newar[selection] > newar[popular]){
        setPopular(selection)
    }
    else {
        setPopular(popular)
    }

    setVotes(newar)
  }




  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]}/>
      <Vote number = {votes[selected]}/>
      <Button handleClick={() => voteAnecdote(selected)} text ="Vote"/>
      <Button handleClick={() => newAnecdote()} text="New Anecdote"/>
      <h1>Anecdote with the most votes</h1>
      <Anecdote text={anecdotes[popular]}/>
      <Vote number = {votes[popular]}/>


    </div>
  )
}

export default App
