const fs = require('fs')

const input = fs.readFileSync('./input', {encoding: 'utf-8'}).split('\n')

const arch = {}
const currentPath = []
let currentDir = arch


// Create arch.json

for (const commandLine of input) {
    const command = commandLine.split(' ')

    switch (command[0]) {
        case '$':
            if (command[1] === 'cd') {
                if (command[2] === '..') {
                    currentPath.pop()
                } else {
                    currentPath.push(command[2])
                }

                currentDir = arch
                // console.log({currentPath})
                for (const path of currentPath.slice(1)) {
                    currentDir = currentDir[path]
                }

                if (!currentDir) {
                    currentDir = {}
                }

                // console.log(currentDir)
            }
            break
        case 'dir':
            currentDir[command[1]] = {}
            break
        default:
            currentDir[command[1]] = command[0]
    }
}

// sum
const THRESHOLD = 100000
let sum = 0

for (const [fileOrFolder, folderOrSize] of Object.entries(arch)) {
    const isFolder = typeof folderOrSize === 'object'

    if (isFolder) {
        checkFolder(folderOrSize)
    }
}

console.log(sum)

function checkFolder(fileSizesAndFolders) {
    let sumOfThisFolder = 0
    for (const fileSizeOrFolder of Object.values(fileSizesAndFolders)) {
        if (typeof fileSizeOrFolder === 'string') {
            sumOfThisFolder += Number(fileSizeOrFolder)
        } else {
            const total = checkFolder(fileSizeOrFolder)
            sumOfThisFolder += total
            sum += total
        }
    }

    if (sumOfThisFolder <= THRESHOLD) {
        return sumOfThisFolder
    }

    return 0
}