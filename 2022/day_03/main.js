const fs = require('fs')

const input = fs.readFileSync('./input', { encoding: 'utf-8'})

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let sum = 0

for (const rucksack of input.split('\n')) {
    const firstCompartiment = rucksack.slice(0, rucksack.length / 2).split('')
    const secondCompartiment = rucksack.slice(rucksack.length / 2).split('')

    for (const item of firstCompartiment) {
        if (secondCompartiment.includes(item)) {
            sum += priority.indexOf(item) + 1
            break
        }
    }
}

console.log('Priority is', sum)

// PART 2
const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);
let sumOfGroup = 0

for (const group of chunk(input.split('\n'), 3)) {
    const ref = group[0].split('')
    for (const item of ref) {
        if (group[1].includes(item) && group[2].includes(item)) {
            sumOfGroup += priority.indexOf(item) + 1
            break
        }
    }
}

console.log('Sum of priority for group of 3 is', sumOfGroup)