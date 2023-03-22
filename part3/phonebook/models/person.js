const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

// mongo connection
mongoose
  .connect(url)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: [true, "phone number is required."],
    minLength: 8,
    validate: {
      validator: (number) =>
        number.includes("-") ? /^\d{2,3}-\d*$/.test(number) : true,
    },
    message: (props) => `${props.value} is not a valid phone number.`,
  },
});

// renamed ._id to .id and cast it to a String
// removed the __v field as it's not needed (it's mongo document version)
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
