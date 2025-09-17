const express = require('express');
const contactRoutes = require('./routes/contact.route');

const app = express();
app.use(express.json());

app.use("/api/contacts", contactRoutes);

mongoose.connect('mongodb+srv://dbMilena:milena125Mongo!@backendb.s0rern9.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackenDB')
.then(() => {
  console.log('Connected to database!');
  app.listen(8080, () => {
      console.log('server listening on port 8080')
})
})
.catch(() => {
  console.error('Connection failed!');
});