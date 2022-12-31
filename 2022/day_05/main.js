const fs = require('fs')

const input = fs.readFileSync('./input', { encoding: 'utf-8'}).split('\n')

const ordersStartAt = input.findIndex((value) => value === '')
const dock = input.slice(0, ordersStartAt - 1).reverse()
const orders = input.slice(ordersStartAt + 1)

const numberOfStacks = Number(input[ordersStartAt - 1].split(' ').at(-1))
let stacks

stacks = []
for (let i = 0; i < numberOfStacks; i++) {
    stacks.push([])
}


// STACKING CREATES
for (const stack of dock) {
    const chunk = stack.match(/.{1,4}/g)

    for (let i = 0; i < chunk.length; i++) {
        if (chunk[i].charAt(1) !== ' ') {
            stacks[i].push(chunk[i].charAt(1))
        }
    }
}

// APPLYING ORDERS
for (const order of orders) {
    const [_, qty, __, from, ___, to] = order.split(' ')

    for (let i = 0; i < qty; i++) {
        stacks[to - 1].push(stacks[from - 1].pop())
    }
}

const getCode = () => {
    let code = ''
    for (const stack of stacks) {
        code += stack.at(-1)
    }
    return code
}

console.log('CrateMover 9000', getCode())

// P2

stacks = []
for (let i = 0; i < numberOfStacks; i++) {
    stacks.push([])
}


// STACKING CREATES
for (const stack of dock) {
    const chunk = stack.match(/.{1,4}/g)

    for (let i = 0; i < chunk.length; i++) {
        if (chunk[i].charAt(1) !== ' ') {
            stacks[i].push(chunk[i].charAt(1))
        }
    }
}

// APPLYING ORDERS
for (const order of orders) {
    const [_, qty, __, from, ___, to] = order.split(' ')

    const movingCrates = stacks[from - 1].splice(stacks[from - 1].length - qty, qty)
    stacks[to - 1].push(...movingCrates)
}

console.log('CreateMover 9001', getCode())