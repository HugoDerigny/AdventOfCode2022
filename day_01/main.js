const fs = require('fs')

const input = fs.readFileSync('./input', { encoding: 'utf-8'})

// PARTIE 1

let max = 0, current = 0

input.split('\n').forEach((value) => {
    if (value === '') {
        if (current > max) {
            max = current
        }
        current = 0
    } else {
        current += Number(value)
    }
})

console.log('Max calorie carried by an elf', max)

// PARTIE 2

let total = 0
const calories = []

input.split('\n').forEach((value) => {
    if (value === '') {
        calories.push(total)
        total = 0;
    } else {
        total += Number(value)
    }
})

const totalCalories = calories.sort((a, b) => b - a).slice(0, 3).reduce((acc, value) => acc += value, 0)
console.log('Sum of calories for the three max carrying elf', totalCalories)