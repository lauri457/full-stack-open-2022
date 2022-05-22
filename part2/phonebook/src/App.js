import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: '', style: '' })


  const addName = (event) => {
    event.preventDefault()
    const newPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (typeof (newPerson) === 'undefined') {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

        })
      setNotification({ message: `Added ${newName}`, style: 'green' })
      setTimeout(() => {
        setNotification({ message: '', style: '' })
      }, 2000);
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...newPerson, number: newNumber }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.id ? person : updatedPerson))
            setNotification({ message: `Updated number for ${updatedPerson.name}`, style: 'green' })
            setTimeout(() => {
              setNotification({ message: '', style: '' })
            }, 2000);
          })
          .catch(error => {
            setNotification({ message: `Information of ${updatedPerson.name} has already been removed from server`, style: 'red' })
            setPersons(persons.filter(person => person.id !== updatedPerson.id))
            setTimeout(() => {
              setNotification({ message: '', style: '' })
            }, 2000)
          }
          )
      }
    }
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch(error => {
          setNotification({ message: `Information of ${person.name} has already been removed from server`, style: 'red' })
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setNotification({ message: '', style: '' })
          }, 2000)
        }
        )
    }
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} style={notification.style} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <Form onSubmit={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App