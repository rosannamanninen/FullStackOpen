import { useState } from 'react'

const PuhelinForm = (props) => {

  return (
    <form>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          num: <input value={props.newNum} onChange={props.handleNumChange}/>
        </div>
        <div>
          <button type="submit" onClick={props.addPerson}>add</button>
        </div>
      </form>

  )
}

const Luettelo = (props) => {

  return (
    <>
      {props.persons.map(
        person => 
        person.name.toLowerCase().includes(props.newFilter) ? <p key={person.name}>
          {person.name + ' ' + person.num}
        </p> : null
        )}
    </>
  )
}

const Filtteri = (props) => {

  return (
    <form>
        <div>
          name: <input value={props.newFilter} onChange={props.handleFilterChange}/>
        </div>
      </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', num: '040-123456' },
    { name: 'Ada Lovelace', num: '39-44-5323523' },
    { name: 'Dan Abramov', num: '12-43-234345' },
    { name: 'Mary Poppendieck', num: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      num: newNum ,
    }
    if (persons.find(element => element.name === newName)) {
      window.alert(newName + ' on jo puheliluettelossa.')
    }
    else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNum('')
  }

  return (
    <div>
        <h2>Phonebook</h2>
        <Filtteri 
          newFilter= {newFilter}
          handleFilterChange = {handleFilterChange}
        />
        <h2>Add new</h2>
        <PuhelinForm 
          newName = {newName}
          handleNameChange = {handleNameChange}
          newNum = {newNum}
          handleNumChange = {handleNumChange}
          addPerson = {addPerson}
          />
        <h2>Numbers</h2>
        <Luettelo 
          persons= {persons}
          newFilter = {newFilter}/>
    </div>
  )

}

export default App