import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Error from './components/Error'
import Notice from './components/Notice'
import axios from 'axios'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [pending, setPending] = useState(true);
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPending(false);
      })
  }, [])

  return (
    <div>
      <Error error={error} />
      <Notice notice={notice} />
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm 
        persons={persons} 
        setPersons={setPersons} 
        setNotice={setNotice} 
        setError={setError}/>
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filter={filter} 
        setPersons={setPersons} 
        pending={pending} 
        setNotice={setNotice} 
        setError={setError}/>
    </div>
  )
}

export default App;