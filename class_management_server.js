const express = require(`express`);
const app = express();
const PORT = 3000;

// const DB_FILE = "data.json";

app.use(express.json());


let user = [
    {
        id:1,
        firstName: "Kevin",
        lastName: "Mcgaurer",
        section: "BSIT 4A",
        status: "p"
    },
    {
        id:2,
        firstName: "Kevina",
        lastName: "Mcgaurers",
        section: "BSIT 4B",
        status: "p"
    }
];



app.get('/user', (res, req) => {
     const {lastName, firstName, section, status} = req.body;
     const userIndex = users.findIndex(user => user.firstName === firstName && user.lastName === lastName);
     if (userIndex !== -1){
        users[userIndex].status = status;
        console.log(`updated attendance for ${lastName} ${firstName} to :${status}`);
        res.status(200).json({message: `attendance for ${lastName} ${firstName} has been updated to ${status}`});
     }else{
        const newUser = {
            id: users.length + 1,
            lastName,
            firstName,
            section,
            status
        };
        user.push(newUser);
        console.log(`new user added : ${lastName} ${firstName} with status ${status}`);
        res.status(201).json({message: `attendance for ${lastName} ${firstName} has been updated to ${status}`});

     }
    
});

app.get('/user', (res, req) => {
    res.status(200).json(users);
});

// app.get('/user', (res, req) => {
//     res.send(`server was running away from http://localhost:${PORT}`);
// });

app.listen(PORT, () => {
    console.log(`server was running away from http://localhost:${PORT}`);
});

module.exports = app;
