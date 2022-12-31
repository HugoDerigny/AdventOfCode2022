const fs = require('fs')

const input = fs.readFileSync('./input', {encoding: 'utf-8'}).split('\n')

const THRESHOLD = 100000

const paths = {}
let level = -1

const currentPath = []
const sumForCurrentDirectory = []

for (const commandLine of input) {
    const command = commandLine.split(' ')

    switch (command[0]) {
        case '$':
            if (command[1] === 'cd') {
                if (command[2] === '..') {
                    level--
                    currentPath.pop()
                    // paths[currentPath.join('/')] += sumForCurrentDirectory.pop()
                } else {
                    level++
                    currentPath.push(command[2])
                    sumForCurrentDirectory.push(0)
                }

                if (!paths[currentPath.join('/')]) {
                    paths[currentPath.join('/')] = { size: 0, level }
                }
            }
            break
        default:
            const size = Number.isNaN(parseInt(command[0])) ? 0 : parseInt(command[0])

            paths[currentPath.join('/')].size += size
            // sumForCurrentDirectory[sumForCurrentDirectory.length - 1] += size
            break
    }
}

const reversed = Object.entries(paths).reverse()
let previousLevel = Number.MIN_SAFE_INTEGER
let cumulatedSize = 0


console.log(paths)
const updated = Object.fromEntries(reversed.map(([path, { size, level }]) => {
    if (level < previousLevel) {
        previousLevel = level
        size += cumulatedSize
        cumulatedSize = 0

        return [path, { size, level }]
    }

    previousLevel = level
    cumulatedSize += size

    return [path, { size, level }]
}).reverse())
console.log(updated)
// should be 1 543 140
console.log(Object.values(updated).filter((value) => value <= THRESHOLD).reduce((acc, value) => acc += value, 0))
