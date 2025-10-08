require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/ContactRoute');
const userRoutes = require('./routes/UserRoute');
const setupSwagger = require('./swagger');


const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

setupSwagger(app);

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

// Connexion à Mongo
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to database!');
  app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
  })
})
.catch(() => {
  console.error('Connection failed!');
});