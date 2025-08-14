const express = require('express');
const app = express();

app.use(express.json());

let users = [
  {
    id: 1,
    firstName: "Kevin",
    lastName: "Mcgaurer",
    section: "BSIT 4A",
    status: "p"
  },
  {
    id: 2,
    firstName: "Kevina",
    lastName: "Mcgaurers",
    section: "BSIT 4B",
    status: "p"
  }
];

// Update or add user attendance
app.post('/user', (req, res) => {
  const { lastName, firstName, section, status } = req.body;
  const userIndex = users.findIndex(
    user => user.firstName === firstName && user.lastName === lastName
  );

  if (userIndex !== -1) {
    users[userIndex].status = status;
    console.log(`Updated attendance for ${lastName} ${firstName} to: ${status}`);
    res.status(200).json({
      message: `Attendance for ${lastName} ${firstName} has been updated to ${status}`
    });
  } else {
    const newUser = {
      id: users.length + 1,
      lastName,
      firstName,
      section,
      status
    };
    users.push(newUser);
    console.log(`New user added: ${lastName} ${firstName} with status ${status}`);
    res.status(201).json({
      message: `Attendance for ${lastName} ${firstName} has been set to ${status}`
    });
  }
});

// Get all users
app.get('/user', (req, res) => {
  res.status(200).json(users);
});

// Root route
app.get('/', (req, res) => {
  res.send(`Server is running.`);
});

// For Vercel: export the app (no app.listen)
module.exports = app;
