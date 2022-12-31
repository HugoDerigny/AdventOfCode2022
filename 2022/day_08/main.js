const fs = require('fs')

const input = fs.readFileSync('./input', {encoding: 'utf-8'}).split('\n').map((row) =>row.split(''))

// on compte les côtés
let visibleTrees = (input[0].length * 2) + (input.length * 2 - 4)

const getMaxHeightAtLeft = (rowIdx, colIdx) => Math.max(...input[rowIdx].slice(0, colIdx).map((tree) => Number.parseInt(tree)))
const getMaxHeightAtRight = (rowIdx, colIdx) => Math.max(...input[rowIdx].slice(colIdx + 1).map((tree) => Number.parseInt(tree)))
const getMaxHeightAtTop = (rowIdx, colIdx) => Math.max(...input.slice(0, rowIdx).map((row) => Number.parseInt(row[colIdx])))
const getMaxHeightAtBottom = (rowIdx, colIdx) => Math.max(...input.slice(rowIdx + 1).map((row) => Number.parseInt(row[colIdx])))

/**
 *   B (i-1,j)
 * A (i, j-1) x (i,j) C (i, j+1)
 *   D (i+1, j)
 */

for (let rowIdx = 1; rowIdx < input.length - 1; rowIdx++) {
    for (let colIdx = 1; colIdx < input[rowIdx].length - 1; colIdx++) {
        const tree = input[rowIdx][colIdx];

        const maxHeightsAtEdges = [getMaxHeightAtLeft(rowIdx, colIdx), getMaxHeightAtRight(rowIdx, colIdx), getMaxHeightAtTop(rowIdx, colIdx), getMaxHeightAtBottom(rowIdx, colIdx)]

        if (maxHeightsAtEdges.some((maxHeight) => maxHeight < tree)) {
            visibleTrees++
        }
    }
}

console.log({ visibleTrees })

// P2

const scenicScores = []

const getMaxHeightAndDistanceAtLeft = (rowIdx, colIdx, currentHeight) => {
    const row = input[rowIdx].slice(0, colIdx).map((tree) => Number.parseInt(tree)).reverse()
    const maxHeight = row.find((height) => height >= currentHeight) ?? -1

    return {
        distance: row.slice(0, row.indexOf(maxHeight)).length + 1,
        maxHeight
    }
}
const getMaxHeightAndDistanceAtRight = (rowIdx, colIdx, currentHeight) => {
    const row = input[rowIdx].slice(colIdx + 1).map((tree) => Number.parseInt(tree))
    const maxHeight = row.find((height) => height >= currentHeight) ?? -1

    return {
        distance: row.slice(0, row.indexOf(maxHeight)).length + 1,
        maxHeight
    }
}
const getMaxHeightAndDistanceAtTop = (rowIdx, colIdx, currentHeight) => {
    const col = input.slice(0, rowIdx).map((row) => Number.parseInt(row[colIdx])).reverse()
    const maxHeight = col.find((height) => height >= currentHeight) ?? -1

    return {
        distance: col.slice(0, col.indexOf(maxHeight)).length + 1,
        maxHeight
    }
}
const getMaxHeightAndDistanceAtBottom = (rowIdx, colIdx, currentHeight) => {
    const col = input.slice(rowIdx + 1).map((row) => Number.parseInt(row[colIdx]))
    const maxHeight = col.find((height) => height >= currentHeight) ?? -1

    return {
        distance: col.slice(0, col.indexOf(maxHeight)).length + 1,
        maxHeight
    }
}

for (let rowIdx = 1; rowIdx < input.length - 1; rowIdx++) {
    for (let colIdx = 1; colIdx < input[rowIdx].length - 1; colIdx++) {
        const tree = Number.parseInt(input[rowIdx][colIdx]);

        const maxHeightsAtEdges = [getMaxHeightAndDistanceAtLeft(rowIdx, colIdx, tree), getMaxHeightAndDistanceAtRight(rowIdx, colIdx, tree), getMaxHeightAndDistanceAtTop(rowIdx, colIdx, tree), getMaxHeightAndDistanceAtBottom(rowIdx, colIdx, tree)]
        if (maxHeightsAtEdges.some((heights) => heights.maxHeight < tree)) {
            scenicScores.push(maxHeightsAtEdges.reduce((acc, value) => acc *= value.distance, 1))
        }
    }
}

console.log('Highest scenir scores:', Math.max(...scenicScores))
