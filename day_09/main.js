const fs = require('fs')

const inputs = fs.readFileSync('./input', {encoding: 'utf-8'}).split('\n')

const test = [
    'R 4',
    'U 4',
    'L 3',
    'D 1',
    'R 4',
    'D 1',
    'L 5',
    'R 2'
]

class Rope {
    constructor() {
        this.head = {
            x: 0,
            y: 0
        }

        this.tail = {
            x: 0,
            y: 0
        }
        this.visitedTiles = []
    }

    move = (direction) => {
        switch (direction) {
            case 'U':
                this.head.y += 1
                break
            case 'D':
                this.head.y -= 1
                break
            case 'L':
                this.head.x -= 1
                break
            case 'R':
                this.head.x += 1
                break
        }
        this.#moveTail()
        this.visitedTiles.push(`X:${this.tail.x},Y:${this.tail.y}`)
    }

    #moveTail = () => {
        const {fromLeft, fromBottom, fromRight, fromTop} = this.#isHeadTooFar()

        if (fromBottom) {
            this.tail.y -= 1
            this.tail.x = this.head.x
        }

        if (fromRight) {
            this.tail.x += 1
            this.tail.y = this.head.y
        }

        if (fromLeft) {
            this.tail.x -= 1
            this.tail.y = this.head.y
        }

        if (fromTop) {
            this.tail.y += 1
            this.tail.x = this.head.x
        }
    }

    #isHeadTooFar = () => {
        const fromLeft = Math.abs(this.tail.x - this.head.x) > 1 && this.tail.x > this.head.x - 1;
        const fromRight = Math.abs(this.tail.x - this.head.x) > 1 && this.tail.x < this.head.x + 1;
        const fromTop = Math.abs(this.tail.y - this.head.y) > 1 && this.tail.y < this.head.y - 1;
        const fromBottom = Math.abs(this.tail.y - this.head.y) > 1 && this.tail.y > this.head.y + 1;

        return {
            fromBottom,
            fromRight,
            fromTop,
            fromLeft
        }
    }

    countUniqueTiles = () => {
        return [...new Set(this.visitedTiles)].length
    }
}

const rope = new Rope()
for (const input of inputs) {
    const [direction, steps] = input.split(' ')

    for (let i = 0; i < steps; i++) {
        rope.move(direction)
    }
}
console.log('Visited tiles for length of 2', rope.countUniqueTiles())

// PART 2

const largerTest = ['R 5',
    'U 8',
    'L 8',
    'D 3',
    'R 17',
    'D 10',
    'L 25',
    'U 20']

class LongerRope {
    knots = []
    visitedTilesByTail = []

    constructor(length) {
        for (let i = 0; i < length; i++) {
            this.knots.push({ x: 0, y: 0 })
        }
    }

    move(direction) {
        const head = this.knots.at(0)

        switch (direction) {
            case 'U':
                head.y += 1
                break
            case 'D':
                head.y -= 1
                break
            case 'L':
                head.x -= 1
                break
            case 'R':
                head.x += 1
                break
        }

        for (let i = 1; i < this.knots.length; i++) {
            this.#moveKnot(i)
        }

        const tail = this.knots.at(-1)
        this.visitedTilesByTail.push(`X:${tail.x},Y:${tail.y}`)
    }

    #moveKnot = (knotidx) => {
        const previousKnot = this.knots.at(knotidx - 1)
        const knot = this.knots.at(knotidx)

        const {fromLeft, fromBottom, fromRight, fromTop} = this.#isHeadTooFar(previousKnot, knot)

        if (fromTop && fromRight) {
            knot.x = previousKnot.x - 1
            knot.y = previousKnot.y - 1
        } else if (fromTop && fromLeft) {
            knot.x = previousKnot.x + 1
            knot.y = previousKnot.y - 1
        } else if (fromBottom && fromLeft) {
            knot.x = previousKnot.x + 1
            knot.y = previousKnot.y + 1
        } else if (fromBottom && fromRight) {
            knot.x = previousKnot.x - 1
            knot.y = previousKnot.y + 1
        } else if (fromBottom) {
            knot.y -= 1
            knot.x = previousKnot.x
        } else if (fromRight) {
            knot.x += 1
            knot.y = previousKnot.y
        }  else if (fromLeft) {
            knot.x -= 1
            knot.y = previousKnot.y
        } else if (fromTop) {
            knot.y += 1
            knot.x = previousKnot.x
        }
    }

    #isHeadTooFar = (head, tail, i) => {
        const fromLeft = Math.abs(tail.x - head.x) > 1 && tail.x > head.x - 1;
        const fromRight = Math.abs(tail.x - head.x) > 1 && tail.x < head.x + 1;
        const fromTop = Math.abs(tail.y - head.y) > 1 && tail.y < head.y - 1;
        const fromBottom = Math.abs(tail.y - head.y) > 1 && tail.y > head.y + 1;

        return {
            fromBottom,
            fromRight,
            fromTop,
            fromLeft
        }
    }

    countUniqueTiles = () => {
        return [...new Set(this.visitedTilesByTail)].length
    }
}

const longerRope = new LongerRope(10)
for (const input of inputs) {
    const [direction, steps] = input.split(' ')

    for (let i = 0; i < steps; i++) {
        longerRope.move(direction)
    }
}
console.log('Visited tiles for length of 10', longerRope.countUniqueTiles())