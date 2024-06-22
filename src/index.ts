import db from './util/db';
import app from './app';

const PORT = 3000;

db.connect().then(() => {
  console.log('mongo db is connected');
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
  })
})
