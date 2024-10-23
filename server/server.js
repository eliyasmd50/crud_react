require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 2500;
const users = require('./model/users.json');
const credentials = require('./middleware/credentials');
const path = require('path');
const fsPromises = require('fs').promises;

//middleware for json
app.use(express.json());

//credentials check for access control header
app.use(credentials);

//cross origin resources sharing
// app.use(cors());
app.use(cors());

//route get methos
app.get("/users",  (req, res) => {
    if(!users) return res.sendStatus(204).json({"message": "No users found"});
    res.json(users);
})

//delete methods
app.delete("/users/:id", async (req, res) => {
    const id = Number(req.params.id);
    const filteredUsers = users.filter((user) => user.id !== id);
    console.log(filteredUsers);
    await fsPromises.writeFile(path.join(__dirname, 'model', 'users.json'), JSON.stringify(filteredUsers));
    res.json(filteredUsers);
})

app.listen(PORT, () => {
    console.log(`Server Running Successfully on port ${PORT}`);
})