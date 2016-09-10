const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Connection Error:', err.message);
});

db.once('open', function callback() {
  console.info("Connected!");
});

const Schema = mongoose.Schema;

const User = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
});

// validation
User.path('id').validate((v) => {
  return v.length > 0 && v.length < 70;
});

const UserModel = mongoose.model('User', User);

const testUser = new UserModel({ id: '1', name: 'Test Test' });

testUser.save(function (err, testUser) {
  if (err) return console.error(err);
});

module.exports.UserModel = UserModel;