# simple-doggie

A simple RESTful API for managing dog information.

## Features

- Get all dogs
- Get a specific dog by ID
- Create a new dog

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### GET /dogs

Returns a list of all dogs.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Buddy",
    "breed": "Golden Retriever",
    "age": 3
  },
  ...
]
```

### GET /dogs/:id

Returns a specific dog by ID.

**Response:**
```json
{
  "id": 1,
  "name": "Buddy",
  "breed": "Golden Retriever",
  "age": 3
}
```

**Error Response (404):**
```json
{
  "error": "Dog not found"
}
```

### POST /dogs

Creates a new dog.

**Request Body:**
```json
{
  "name": "Luna",
  "breed": "Husky",
  "age": 4
}
```

**Response (201):**
```json
{
  "id": 4,
  "name": "Luna",
  "breed": "Husky",
  "age": 4
}
```

**Error Response (400):**
```json
{
  "error": "Name, breed, and age are required"
}
```

## Testing

Run the test suite:

```bash
npm test
```

## Technologies Used

- Node.js
- Express.js
- Jest
- Supertest