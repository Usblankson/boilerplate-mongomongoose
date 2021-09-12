require("dotenv").config();

/** 1) Install & Set up mongoose */
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

var personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favouriteFoods: [String]
});

var Person = mongoose.model("Person", personSchema);

var createAndSavePerson = function(done) {
  var blankson = new Person({
    name: "Blankson",
    age: 23,
    favoriteFoods: ["Egusi", "Eba", "Jollof"]
  });

  blankson.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
  //done(null/*, data*/);
};

var findPeopleByName = function(personName, done) {
  Person.find({ name: personName }, (err, data) => {
    if (err) console.error(err);
    done(null, data);
  });
  //done(null/*, data*/);
};

var findOneByFood = function(food, done) {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

var findPersonById = function(personId, done) {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  
  Person.findById(personId, (err,data)=>{
    if(err) return console.error(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err,data)=>{
      if(err) return console.error(err);
      done(null,data);
    });
  });
};

var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:20},{new:true},(err,data)=>{
    if(err) return console.error(err);
    done(null,data);
  });

};



const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = done => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = done => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
