const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
const app = express();
const { requireAuth } = require('./middleware/authMiddleware')


// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://apxhd:A@biskar1491@cluster0.3cnv3.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/burgers', (req, res) => res.render('burgers'));
app.use(authRoutes)