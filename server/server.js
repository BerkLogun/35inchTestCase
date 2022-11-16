const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
app.use(express.json());

const db = require('./app/models');
db.sequelize.sync().then(() => {
  console.log('Drop and re-sync db.');
}).catch(err => {
  console.log(err);
})



app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the application.' });
});

require('./app/routes/userRoute.js')(app);
require('./app/routes/newsRoute.js')(app);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

