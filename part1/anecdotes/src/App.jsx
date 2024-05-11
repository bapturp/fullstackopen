import { useState } from 'react'

const Anecdocte = ({anecdotes, selected, points}) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <Vote points={points} selected={selected}></Vote>
    </div>
  )
}

const Vote = ({points, selected}) => {
  if (points[selected] === undefined) return (
    <div>
      <p>has 0 vote</p>
    </div>
  )
  
  return (
    <div>
      <p>has {points[selected]} votes</p>
    </div>
  )
}

const MostVoted = ({anecdotes, mostVoted}) => {
  return (
    <div>
      <h2>Anecdotes with most votes</h2>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({})
  const [mostVoted, setMostVoted] = useState(-1)

  const getRandomInt = (max) => Math.floor(Math.random() * max)

  const handleNextAnecdote = () => setSelected(getRandomInt(anecdotes.length))

  const handleVote = () => {
    const p  = {...points}
    p[selected] === undefined ? p[selected] = 1 : p[selected]++
    setPoints(p)
    mostVotedAnecdote(p)
  }

  const mostVotedAnecdote = (points) => {
    const maxValue = Math.max(...Object.values(points))
    const maxKeys = Object.keys(points).filter(key => points[key] === maxValue)
    setMostVoted(maxKeys[0])
  }

  return (
    <div>
      <Anecdocte anecdotes={anecdotes} selected={selected} points={points}></Anecdocte>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <MostVoted anecdotes={anecdotes} mostVoted={mostVoted}></MostVoted>
    </div>
  )
}

export default App
