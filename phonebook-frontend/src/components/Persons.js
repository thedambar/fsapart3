import React from 'react';
import personService from '../services/personService';

const Person = ({person, persons, setPersons, setError, setNotice}) => {
  return (
    <div>
      {person.name} {person.number} <DeletePersonButton person={person} persons={persons} setPersons={setPersons} setError={setError} setNotice={setNotice}/>
    </div>  
  )
}

const DeletePersonButton = ({person, persons, setPersons, setNotice, setError}) => {
  const handleDeletePerson = () => {
    personService.del(person.id)
      .then(() => {
        setNotice(`Deleted ${person.name}`);
        setTimeout(() => setNotice(null), 5000);
      })
      .catch(() => {
        setError(`Error: could not delete ${person.name}.`);
        setTimeout(() => setError(null), 5000);
      })
    setPersons(persons.filter(p => p.id !== person.id));
  } 

  return <button onClick={handleDeletePerson}>delete</button>
}

const Persons = ({persons, filter, setPersons, pending, setNotice, setError}) => {
  if (pending) {
    return <div>Loading...</div>;
  }
  const filteredPersons = filter !== '' ? 
    persons.filter((person) => 
      person.name.toString().toLowerCase().includes(filter.toString().toLowerCase())) :
    persons
  
  if (filteredPersons.length > 0) {
    return filteredPersons.map((person) => 
      <Person 
        key={person.id} 
        person={person} 
        persons={persons} 
        setPersons={setPersons} 
        setNotice={setNotice} 
        setError={setError} />
    )
   }
  return <div>No entries found.</div>
}

export default Persons;