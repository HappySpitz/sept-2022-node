// Events

// const event = require('node:events');
//
// const eventEmitter = new event();
//
// eventEmitter.on('click', (data) => {
//     console.log(data);
//     console.log('Click click click')
// });
//
// eventEmitter.emit('click', {name: "Anton"});
// eventEmitter.emit('click', {name: "Anton"});
//
// eventEmitter.once('clickAndDie', () => {
//     console.log('I\'m gonna die after being called');
// });
//
// console.log(eventEmitter.eventNames());
//
// eventEmitter.emit('clickAndDie');
// eventEmitter.emit('clickAndDie');
// eventEmitter.emit('clickAndDie');
// eventEmitter.emit('clickAndDie');
//
// console.log(eventEmitter.eventNames());

const fs = require('node:fs');
const path = require('node:path');

//Streams

// const readStream = fs.createReadStream(path.join('main_folder', 'folder6', 'file'));
// const writeStream = fs.createWriteStream(path.join('main_folder', 'folder2', 'file'))

// readStream.on('data', (chunk) => {
//     // console.log('---------');
//     // console.log(chunk);
//     // console.log('---------');
//     writeStream.write(chunk)
// })

// const handleError = () => {
//     console.error('ERROR!!!');
//     readStream.destroy();
//     writeStream.end('Error while reading file')
// }
//
// readStream
//     .on("error", handleError)
//     .pipe(writeStream)
//     .on('error', handleError);

// Express

const express = require('express');
const fsService = require('./fs.service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/welcome', (req, res) => {
    res.send('WELCOME!!!');
});

app.get('/users', async (req, res) => {
    const users = await fsService.reader();
    res.json(users)
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = await fsService.reader();
    const user = users.find((user) => user.id === +userId);

    if (!user) {
       res.status(422).json(`User with id: ${userId} not found`)
    }

    res.json(user)
})

app.post('/users', async (req, res) => {
    const {name, age, gender} = req.body;

    if (!name || name.length < 2) {
        return res.status(400).json({
            message: 'Wrong name!'
        })
    }
    if (!age || !Number.isInteger(age) || Number.isNaN(age)) {
       return res.status(400).json({
            message: 'Wrong age!'
        })
    }
    if (!gender || (gender !== 'male' && gender !== 'female' && gender !== 'mixed')) {
        return res.status(400).json({
            message: 'Wrong gender!'
        })
    }

    const users = await fsService.reader();
    const newUser = {id: users[users.length - 1]?.id + 1 || 1, name, age, gender};

    users.push(newUser);
    await fsService.writer(users);

    res.status(201).json({newUser})
})

app.patch('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const {name, age, gender} = req.body;

    if (!name || name.length < 2) {
        return res.status(400).json({
            message: 'Wrong name!'
        })
    }
    if (!age || !Number.isInteger(age) || Number.isNaN(age)) {
        return res.status(400).json({
            message: 'Wrong age!'
        })
    }
    if (!gender || (gender !== 'male' && gender !== 'female' && gender !== 'mixed')) {
        return res.status(400).json({
            message: 'Wrong gender!'
        })
    }

    const users = await fsService.reader();
    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
        res.status(422).json(`User with id: ${userId} not found`);
    }

    users[index] = {...users[index], ...req.body};

    await fsService.writer(users);
    res.status(201).json(users[index]);
})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = await fsService.reader();
    const index = users.findIndex((user) => user.id === +userId);
    if (index === -1) {
        res.status(422).json(`User with id: ${userId} not found`);
    }

    users.splice(index,1);
    await fsService.writer(users);

    res.sendStatus(204)
})

const PORT = 5100;

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT} :)`)
})
