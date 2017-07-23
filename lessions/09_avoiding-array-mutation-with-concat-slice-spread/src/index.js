import registerServiceWorker from './registerServiceWorker';
import expect from 'expect';
var deepFreeze = require('deep-freeze');

const incrementCounter = (list, index) => {
    //doing mutation
    // list[index]++;
    // return list;

    //works fine
    // return list
    //     .slice(0, index)
    //     .concat([list[index] + 1])
    //     .concat(list.slice(index + 1));

    //using spread
    return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)];
};
const testIncrementCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];
    deepFreeze(listBefore);
    expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};
testIncrementCounter();
const removeCounter = (list, index) => {
    //will not work, mutation array
    // list.splice(index, 1);
    // return list;

    //use slice
    //return list.slice(0, index).concat(list.slice(index + 1));

    //using es6 spread
    return [...list.slice(0, index), ...list.slice(index + 1)];
};
const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];
    deepFreeze(listBefore);
    expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};
testRemoveCounter();
const addCounter = list => {
    //will not work,  using mutation
    //list.push(0);
    //return list

    //works fine
    //return list.concat([0]);

    //using es6 spread operator
    return [...list, 0];
};

const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];
    deepFreeze(listBefore);
    expect(addCounter(listBefore)).toEqual(listAfter);
};

testAddCounter();
console.log('All test passed');
registerServiceWorker();
