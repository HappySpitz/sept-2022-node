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

