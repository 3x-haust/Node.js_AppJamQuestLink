import mongoose from 'mongoose';

// mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.9');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function callback(){
//   console.log("mongo db is connected");
// });

const connect = () => {
  return mongoose.connect('mongodb://127.0.0.1:27017/');
};

export default { connect };



