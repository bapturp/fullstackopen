const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

// mongo connection
mongoose
  .connect(url)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// renamed ._id to .id and cast it to a String
// removed the __v field as it's not needed (it's mongo document version)
numberSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Number", numberSchema);
