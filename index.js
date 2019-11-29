const express = require('express');
const app = express();
const port = 3005;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
//Impoirt routes
const authRoutes = require('./routes/auth');
const posts = require('./routes/posts');
const events = require('./routes/events');
dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
     () => console.log('connected')
);

//Middleware
app.use(express.json());
app.use(cors());

//route middleware
app.use('/api/user', authRoutes);
app.use('/api/post', posts);
app.use('/api/events', events);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))