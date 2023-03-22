const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}
const collectionName = 'phonebook';
const password = process.argv[2];

const url = `mongodb+srv://yo7AgqB4KMEo9TmHP4Wb:${password}@cluster1.xx6kbup.mongodb.net/${collectionName}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Number = mongoose.model('Number', numberSchema);

// const number = new Number({
//   name: "Arto Hellas",
//   number: "040-123456",
// });

// number.save().then((result) => {
//   console.log("Number saved!");
//   console.log(result);
//   mongoose.connection.close();
// });

if (process.argv.length >= 5) {
  const new_number = new Number({
    name: process.argv[3],
    number: process.argv[4],
  });

  new_number.save().then(() => {
    console.log('number saved');
    mongoose.connection.close();
  });
} else {
  Number.find({}).then((result) => {
    result.forEach((number) => {
      console.log(number);
    });
    mongoose.connection.close();
  });
}
