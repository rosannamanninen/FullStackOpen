import { useState, useEffect } from 'react'
import PuhelinForm from './components/PuhelinForm'
import Luettelo from './components/Luettelo'
import Filtteri from './components/Filtteri'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css';



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorBadMessage, setBadErrorMessage] = useState(null)



  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
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
    const personExists =  persons.find(element => element.name === newName)
    if (personExists) {
      window.confirm(newName + 'on jo puhelinluettelossa. Päivitetäänkö numero?')
      personService
      .updatePerson(personExists.id ,personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.name !== personObject.name ? person : personObject))
        setErrorMessage('Numero päivitetty onnistuneesti.')
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setBadErrorMessage('Numeron päivitys epäonnistui.')
        setTimeout(() => {
          setBadErrorMessage(null)
        }, 5000)
      }
        )
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      setErrorMessage(personObject.name + ' lisätty.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      })
      .catch(error => {
        setBadErrorMessage('Numeron lisäys epäonnistui.')
        setTimeout(() => {
          setBadErrorMessage(null)
        }, 5000)
      }
        )
    }
    setNewName('')
    setNewNumber('')
  }

  const delPerson = (id, name) => {

    if (window.confirm('Delete ' + name + '?')){
    personService
    .deletePerson(id)
    .then(returnedPerson => {
      setPersons(persons.filter(person => person.id !== id))
      if (returnedPerson !== undefined) {
        setErrorMessage(name + ' poistettu.')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } }
      )
      .catch(error => {
        setBadErrorMessage('Henkilöä ' + name + ' ei voitu poistaa, sillä hänet oli jo poistettu.')
        setTimeout(() => {
          setBadErrorMessage(null)
        }, 5000)
      }
        )
        
      }
  }

  return (
    <div>
        <h2>Phonebook</h2>
        <Notification type="goodMessage" message={errorMessage} />
        <Notification type="badMessage" message={errorBadMessage} />
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