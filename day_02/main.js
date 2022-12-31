const fs = require('fs')

const coups = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSOR',

    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSOR'
}

const scores = {
    ROCK: 1,
    PAPER: 2,
    SCISSOR: 3,
    LOSS: 0,
    DRAW: 3,
    WIN: 6
}

const conditions = {
    ROCK: {
        PAPER: 'LOSS',
        ROCK: 'DRAW',
        SCISSOR: 'WIN'
    },
    PAPER: {
        PAPER: 'DRAW',
        ROCK: 'WIN',
        SCISSOR: 'LOSS'
    },
    SCISSOR: {
        PAPER: 'WIN',
        ROCK: 'LOSS',
        SCISSOR: 'DRAW'
    }
}

function getScore(coupElf, coupMe) {
    const elf = coups[coupElf]
    const me = coups[coupMe]

    return scores[me] + scores[conditions[me][elf]]
}

const input = fs.readFileSync('./input', { encoding: 'utf-8'})

console.log(input.split('\n').reduce((acc, game) => {
    const [elf, me] = game.split(' ')

    return acc + getScore(elf, me)
}, 0))

// PART 2

const updateCoup = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSOR',

    X: 'LOSS',
    Y: 'DRAW',
    Z: 'WIN'
}

const forResult = {
    LOSS: {
        ROCK: 'SCISSOR',
        SCISSOR: 'PAPER',
        PAPER: 'ROCK'
    },
    DRAW: {
      ROCK: 'ROCK',
      PAPER: 'PAPER',
      SCISSOR: 'SCISSOR',
    },
    WIN: {
        ROCK: 'PAPER',
        SCISSOR: 'ROCK',
        PAPER: 'SCISSOR'
    }
}

function updatedGetScore(coupElf, result) {
    const elf = updateCoup[coupElf]
    const gameResult = updateCoup[result]

    const whatShouldIPlay = forResult[gameResult][elf]

    return scores[whatShouldIPlay] + scores[gameResult]
}

console.log(input.split('\n').reduce((acc, game) => {
    const [elf, me] = game.split(' ')

    return acc + updatedGetScore(elf, me)
}, 0))