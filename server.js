const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store for dogs
let dogs = [
  { id: 1, name: 'Buddy', breed: 'Golden Retriever', age: 3 },
  { id: 2, name: 'Max', breed: 'German Shepherd', age: 5 },
  { id: 3, name: 'Charlie', breed: 'Labrador', age: 2 }
];

let nextId = 4;

// GET /dogs - Get all dogs
app.get('/dogs', (req, res) => {
  res.json(dogs);
});

// GET /dogs/:id - Get a specific dog by id
app.get('/dogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dog = dogs.find(d => d.id === id);
  
  if (!dog) {
    return res.status(404).json({ error: 'Dog not found' });
  }
  
  res.json(dog);
});

// POST /dogs - Create a new dog
app.post('/dogs', (req, res) => {
  const { name, breed, age } = req.body;
  
  // Validation
  if (!name || !breed || age === undefined) {
    return res.status(400).json({ error: 'Name, breed, and age are required' });
  }
  
  const newDog = {
    id: nextId++,
    name,
    breed,
    age: parseInt(age)
  };
  
  dogs.push(newDog);
  res.status(201).json(newDog);
});

// Start server only if not in test mode
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Dog API server running on port ${port}`);
  });
}

module.exports = app;
