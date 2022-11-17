const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// NOTE 
// I would love to use ES6 syntax in the whole project 
// but i stick with the old syntax because i got some problems with importing modules and i don't know why
// since i have limited time i wouldnt want to waste my time trying to fix it

// so the FRONTEND side of this project uses ES6 syntax 
// and the BACKEND side uses the old syntax


dotenv.config();



const app = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" }));  // limiting the post request size to 50mb so we can upload images
app.use(express.json({ limit: "50mb" }));
app.use(cors());



const db = require('./app/models');
db.sequelize.sync().then(() => {
  console.log('Drop and re-sync db.');
}).catch(err => {
  console.log(err);
})



app.get('/', (req, res) => {
  res.json({ message: 'Welcome to 35inch test case' });

});

require('./app/routes/userRoute.js')(app);
require('./app/routes/newsRoute.js')(app);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

