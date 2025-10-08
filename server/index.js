require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/ContactRoute');
const userRoutes = require('./routes/UserRoute');
const setupSwagger = require('./swagger');
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

setupSwagger(app);

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

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