const fs = require('fs')

const input = fs.readFileSync('./input', { encoding: 'utf-8'})
let overlappingPairs = 0

for (const pair of input.split('\n')) {
    const [p1, p2] = pair.split(',')
    const [ft1, et1] = p1.split('-')
    const [ft2, et2] = p2.split('-')

    const p1IsInP2 = Number(ft1) >= Number(ft2) && Number(et1) <= Number(et2)
    const p2IsInP1 = Number(ft2) >= Number(ft1) && Number(et2) <= Number(et1)

    if (p1IsInP2 || p2IsInP1) {
        overlappingPairs++
    }
}

console.log({overlappingPairs})

// P2

let rangeOverlaps = 0

for (const pair of input.split('\n')) {
    const [p1, p2] = pair.split(',')
    const [ft1, et1] = p1.split('-')
    const [ft2, et2] = p2.split('-')

    const p1IsInP2 = Number(ft1) >= Number(ft2) && Number(et1) <= Number(et2)
    const p2IsInP1 = Number(ft2) >= Number(ft1) && Number(et2) <= Number(et1)
    const isOverlapping = (Number(ft2) >= Number(ft1) && Number(ft2) <= Number(et1)) || (Number(ft1) >= Number(ft2) && Number(ft1) <= Number(et2))

    if (isOverlapping || p1IsInP2 || p2IsInP1) {
        rangeOverlaps ++
    }
}

console.log({ rangeOverlaps })