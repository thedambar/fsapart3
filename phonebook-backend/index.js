const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))


let persons = 
  [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
  ];

app.get('/', (request, response) => {
  response.send('Hello')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons/', (request, response) => {
  const body = request.body;
  console.log(request.body)

  if (!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if(!(body.name || body.number)) {
    return response.status(400).json({
      error: 'name or number missing'
    })   
  }

  if(persons.find(person => (person.name === body.name))) {
    return response.status(400).json({
      error: `${body.name} already exists`
    })     
  }

  const newId = Math.floor(Math.random()*1000000000);
  const newPerson = {
    id: newId,
    name: request.body.name,
    number: request.body.number
  }
  persons = persons.concat([newPerson])
  return response.json(newPerson)
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  const theDate = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people<p><p>${theDate}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})