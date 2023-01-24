import { useState, useEffect } from 'react'
import PuhelinForm from './components/PuhelinForm'
import Luettelo from './components/Luettelo'
import Filtteri from './components/Filtteri'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber ,
    }
    if (persons.find(element => element.name === newName)) {
      window.alert(newName + ' on jo puheliluettelossa.')
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const delPerson = (event) => {
    event.preventDefault()
    const butPerson = event.target.value
    console.log('tääl deletes')
    if (window.confirm('delete' + butPerson.name))
    personService.deletePerson(butPerson.id)
    .then(returnedPerson => setPersons(persons.filter(person => person.id !== butPerson.id)))
    console.log(persons)


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
          newNumber = {newNumber}
          handleNumberChange = {handleNumberChange}
          addPerson = {addPerson}
          />
        <h2>Numbers</h2>
        <Luettelo 
          persons= {persons}
          newFilter = {newFilter}
          delPerson = {delPerson}/>
    </div>
  )

}

export default App