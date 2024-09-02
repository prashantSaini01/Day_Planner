const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const TodoModel = require('./Models/Todo');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(error => console.error('MongoDB connection error:', error));

  app.get('/get',(req,res)=>{
    TodoModel.find().then(result=> res.json(result))
    .catch(err=> res.status(500).json({message:err.message}))
})

app.put('/update/:id',(req,res)=>{
  const {id} = req.params;
  TodoModel.findByIdAndUpdate({_id:id},{done:true})
  .then(result=> res.json(result))
  .catch(err=> res.status(500).json({message:err.message}))
})

app.delete('/delete/:id',(req,res)=>{
  const {id} = req.params;
  TodoModel.findByIdAndDelete({_id:id})
  .then(result=> res.json(result))
  .catch(err=> res.status(500).json({message:err.message}))
  
  
})



app.post('/add', (req, res) => {
  const task = req.body.task;
  TodoModel.create({task:task})
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
