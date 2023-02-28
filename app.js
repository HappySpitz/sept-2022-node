const path = require('path');
const fs = require('fs');

// fs.mkdir(path.join('main_folder'), (err) => {
//     if (err) throw new Error(err.message)
// });

const arrFolder = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
//
// for (const name of arrFolder) {
//     fs.mkdir(path.join('main_folder', name), (err) => {
//         if (err) throw new Error(err.message)
//     })
// }

const arrFile = ['file1', 'file2', 'file3', 'file4', 'file5'];
//
// for (const name of arrFile) {
//     fs.writeFile(path.join('main_folder', name), `hello from ${name}`, (err) => {
//         if (err) throw new Error(err.message)
//     })
// }

// for (const name of arrFile) {
//     fs.readFile(path.join('main_folder', name), {encoding: 'utf-8'}, (err, data) => {
//         if (err) throw new Error(err.message);
//         console.log(data)
//     })
// }

// fs.writeFile(path.join('main_folder', 'folder1', 'file'), 'loading..............', (err) => {
//         if (err) throw new Error(err.message)
//     })

// for (const name of arrFolder) {
//     fs.writeFile(path.join('main_folder', name, 'file_1'), 'loading..............', (err) => {
//         if (err) throw new Error(err.message)
//     })
// }

// for (const name of arrFolder) {
//     fs.readdir(path.join('main_folder', name),(err, data) => {
//         if (err) throw new Error(err.message)
//         if (name.isFile) {
//             console.log(data);
//         } else {
//             console.log(name)
//         }
//     })
// }

// for (const name of arrFolder) {
//     fs.readdir(path.join('main_folder', name), {withFileTypes: true}, (err, data) => {
//         if (err) throw new Error(err.message)
//         data.forEach(file => {
//             console.log(file.isFile());
//         })
//     })
// }

// fs.unlink(path.join('main_folder', 'folder2', 'file_1'), (err) => {
//     if (err) throw new Error(err.message)
// })