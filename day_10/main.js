const fs = require('fs')

class Program {
    constructor() {
        this.instructions = fs.readFileSync('./input', {encoding: 'utf-8'}).split('\n')
        this.cycle = 0
        this.register = 1
        this.sprite = Array.from({ length: 40 }).map(() => '.').splice(0, 3, '#').join('')
        this.cycleSteps = [20, 60, 100, 140, 180, 220]
        this.signalStengths = []
    }

    run = () => {
        for (const instruction of this.instructions) {
            const [command, arg] = instruction.split(' ')

            switch (command) {
                case 'noop':
                    this.#tick()
                    break

                case 'addx':
                    this.#tick()
                    this.#tick()
                    this.register += Number(arg)
                    break
            }
        }
    }

    #tick = () => {
        this.cycle += 1

        if (this.cycleSteps.includes(this.cycle)) {
            this.signalStengths.push(this.register * this.cycle)
        }
    }

    getSignalStrength = () => {
        return this.signalStengths.reduce((acc, strength) => acc += strength, 0)
    }
}

const program = new Program()

program.run()

console.log('Cumulated signal strength', program.getSignalStrength())

// P2

class Program {
    constructor() {
        this.instructions = fs.readFileSync('./input', {encoding: 'utf-8'}).split('\n')
        this.cycle = 0
        this.register = 1
        this.cycleSteps = [20, 60, 100, 140, 180, 220]
        this.signalStengths = []
    }

    run = () => {
        for (const instruction of this.instructions) {
            const [command, arg] = instruction.split(' ')

            switch (command) {
                case 'noop':
                    this.#tick()
                    break

                case 'addx':
                    this.#tick()
                    this.#tick()
                    this.register += Number(arg)
                    break
            }
        }
    }

    #tick = () => {
        this.cycle += 1

        if (this.cycleSteps.includes(this.cycle)) {
            this.signalStengths.push(this.register * this.cycle)
        }
    }

    getSignalStrength = () => {
        return this.signalStengths.reduce((acc, strength) => acc += strength, 0)
    }
}