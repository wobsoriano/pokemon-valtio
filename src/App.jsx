import React, { useEffect } from 'react'
import { proxy, useProxy } from 'valtio'

import './App.css'

const URL = 'https://gist.githubusercontent.com/wobsoriano/33c6fad65fc3ac1685574006683e15a8/raw/f8d792f5b2cf97eaaf9f0c2119918f333e348823/pokemon.json'

const state = proxy({
  pokemon: [],
  filter: ''
})

function FilterInput() {
  const snapshot = useProxy(state)
  
  const handleChange = (evt) => {
    state.filter = evt.target.value
  }

  return <input value={snapshot.filter} onChange={handleChange} />
}

function PokemonTable() {
  const snapshot = useProxy(state)
  
  return (
    <table width="100%">
      <tbody>
        {snapshot.pokemon
        .filter(p => p.name.english.toLowerCase().includes(snapshot.filter))
        .map(p => (
          <tr key={p.id}>
            <td>{p.name.english}</td>
            <td>{p.type.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function App() {
  useEffect(() => {
    fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      state.pokemon = data
    })
  }, [])

  return (
    <div className="App">
      <FilterInput />
      <PokemonTable />
    </div>
  )
}

export default App
