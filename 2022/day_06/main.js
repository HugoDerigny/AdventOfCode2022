const fs = require('fs')

const input = fs.readFileSync('./input', {encoding: 'utf-8'})

function startOfPacket() {
    for (let i = 0; i < input.length; i++) {
        const currentFourChar = input.slice(i, i + 4)

        if ([...new Set(currentFourChar.split(''))].length === 4) {
            console.log('Characters for start-of-packet processed', i + 4)
            return 0
        }
    }
}

startOfPacket()
// P2

function startOfMessage() {
    for (let i = 0; i < input.length; i++) {
        const currentFourteenChar = input.slice(i, i + 14)

        if ([...new Set(currentFourteenChar.split(''))].length === 14) {
            console.log('Characters for start-of-message processed', i + 14)
            return 0
        }
    }
}

startOfMessage()