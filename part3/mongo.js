const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide input as: node mongo.js <password> <name> <number>'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://whejy:${password}@cluster0.q4h2rnq.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url).then(console.log('connected'))

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // Get all phonebook entries
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  // Add new entry to phonebook
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`Added ${name} number: ${number} to phonebook`)
    mongoose.connection.close()
  })
}
