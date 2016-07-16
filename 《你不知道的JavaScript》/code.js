var myArray = [1, 2, 3];

var it = myArray[Symbol.iterator]();

it.next();  // { value: 1, done: false }
it.next();  // { value: 1, done: false }
it.next();  // { value: 1, done: false }
it.next();  // { value: undefined, done: true }