const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.CONNECTION_STRING,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', error.message));

app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy : false }));

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || [process.env.CLIENT_URL].indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  'allowedHeaders': ['Origin', 'X-Requested-With', 'sessionId', 'Accept', 'Content', 'Content-Type', 'Authorization'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment/post', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;