const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, firstName: "Kevin", lastName: "Mcgaurer", section: "BSIT 4A", status: "p" },
  { id: 2, firstName: "Kevina", lastName: "Mcgaurers", section: "BSIT 4B", status: "p" }
];

app.post('/user', (req, res) => {
  const { lastName, firstName, section, status } = req.body;
  const userIndex = users.findIndex(
    user => user.firstName === firstName && user.lastName === lastName
  );

  if (userIndex !== -1) {
    users[userIndex].status = status;
    return res.status(200).json({
      message: `Attendance for ${lastName} ${firstName} has been updated to ${status}`
    });
  }

  const newUser = {
    id: users.length + 1,
    lastName,
    firstName,
    section,
    status
  };
  users.push(newUser);
  res.status(201).json({
    message: `Attendance for ${lastName} ${firstName} has been set to ${status}`
  });
});

app.get('/user', (req, res) => {
  res.status(200).json(users);
});

app.get('/', (req, res) => {
  res.send(`Server is up running`);
});

// Local dev: listen on PORT, but skip in Vercel
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;

