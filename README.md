# Links
[Discord](https://discord.gg/n5TpKjss52)
[Documentation](https://nodebook.js.org)

Nodebook is a module that you can use to edit, manage, and configure external files, like a **notebook**.

## Installation

```yml
# with npm
npm install nodejs-notebook
```

# Usage

## Nodebook
Nodebook has a default class in case you want to edit files that do not have their own custom formatting.

### Setup
```js
const Nodebook = require('nodejs-notebook');

const myNotebook = new Nodebook.Nodebook('file name', 'txt');
```
#### fileName(options)
object `options`:
* `options.lower` - Whether or not the name should be turned to lower case.

**Return**: The file name.

```js
myNotebook.fileName({ lower: false });
// returns "file_name.txt"
```
#### clearLog()
Clears .booklog.txt

```js
myNotebook.clearLog();
// clears .booklog.txt
```
#### resetFile()
Resets the file.

```js
myNotebook.resetFile();
// resets file_name.txt
```
#### deleteFile(delay)
Deletes the file

number `delay`:
Sets how many __seconds__ before deleting the file.
```js
myNotebook.deleteFile();
// Deletes the file instantly

myNotebook.deleteFile(3);
// Deletes the file in 3 seconds
```
#### fetchLine(line)
Fetches an existing line's content.

number `line`:
The line number to get the information from.
```js
myNootebook.fetchLine(1);
// fetches the first line

myNotebook.fetchLine(5);
// fetches the fifth line
```
**Return**: The line content.
#### deleteLine(line)
Sets an existing line in the file to empty.

number `line`:
The line number to make empty.
```js
myNotebook.deleteLine(1);
// sets the first line empty
```
#### editLine(line, key)
Replaces an existing lin ewith a new string.

number `line`:
The line number to set it to.

string `key`:
The string that will replace the line.
```js
myNotebook.editLine(1, 'Welcome!');
// sets the first line to 'Welcome!'
```
#### addLine(key)
Adds a string at the next available line in the file.

string `key`:
The string to add at the next available line.

```js
myNotebook.addLine('Yippi Ki Yay!');
// adds 'Yippi Ki Yay!' to the next line
```

#### content()
Returns the file's content into a string.

```js
console.log(myNotebook.content());
// should log the file's content
```
