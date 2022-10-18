import React, {useState} from 'react';
import personService from '../services/personService';

const PersonForm = ({persons, setPersons, setError, setNotice}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);


  const addPerson = (event) => {
    event.preventDefault();
    const testExists = persons.filter(person => person.name === newName);
    if (testExists.length > 0) {
      const oldEntry = testExists[0];
      if (window.confirm(`${newName} is already in phonebook.  Update number to ${newNumber}`)) {
        personService
          .update(oldEntry.id, {name: newName, number: newNumber, id: oldEntry.id})
          .then(newEntry => {
            setNotice(`Updated number for ${newName}`);
            setTimeout(() => setNotice(null), 5000);
            setPersons(persons.map(person => person.id !== newEntry.data.id ? person : newEntry.data));
          })
          .catch(error => {
            setError(`Error updating ${newName}`);
            setTimeout(() => setError(null), 5000);
          })
        setNewName('');
        setNewNumber('');
        return;
      } else {
        return;
      }
    }
    personService
      .create({name: newName, number: newNumber})
      .then(newEntry => {
        setNotice(`Added entry for ${newName}`);
        setTimeout(() => setNotice(null), 5000);
        setPersons(persons.concat(newEntry)) 
      })
      .catch(error => {
        setError(`Error creating entry ${newName}`);
        setTimeout(() => setError(null), 5000);     
      })
    setNewName('');
    setNewNumber('')
  }

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit" onClick={addPerson}>add</button>
      </div>
    </form>
  )
}

export default PersonForm;