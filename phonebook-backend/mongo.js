const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please a password for the database: node mongo.js <password>')
  process.exit(1)
}

const password = escape(process.argv[2])
const url = `mongodb+srv://mongo:${password}@cluster0.ed9c8uk.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)
const db = mongoose.connect(url)

if (process.argv.length > 3) {
  if (process.argv.length < 5) {
    console.log('Please the following arguments: node mongo.js <password> <name> <number>')
    process.exit(1)
  }
  const name = process.argv[3]
  const number = process.argv[4]

  db
    .then((result) => {
      console.log('connected')
      const person = new Person({
        name: name,
        number: number
      })
      return person.save()
    })
    .then(() => {
      console.log('person saved!')
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
} else {
  db
    .then((result) => {
      console.log('connected')
      Person.find({})
        .then( result => {
          result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
          })
          return mongoose.connection.close()
        })
    })
    .catch(err => console.log(err))
}






