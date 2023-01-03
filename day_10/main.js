const fs = require('fs')

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

const program = new Program()

program.run()

console.log('Cumulated signal strength', program.getSignalStrength())

// P2

class ProgramSprite {
    constructor() {
        this.instructions = fs.readFileSync('./test', {encoding: 'utf-8'}).split('\n')
        this.cycle = 0
        // this.register = 1
        this.cycleStep = 40
        this.sprite = this.#initSprite()
        this.sprites = []

        console.log(`Sprite position: ${this.sprite.join('')}`)
    }

    #initSprite = () => ['#', '#', '#', ...Array.from({ length: 37 }).map(() => '.')]

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
                    const register = Number.parseInt(arg)
                    if (register > 0) {
                        this.sprite = [...Array.from({ length: register}).map(() => '.'), ...this.sprite].slice(0, 40)
                    } else {
                        const abs = Math.abs(register)
                        this.sprite = [...this.sprite.slice(Math.min(abs, this.sprite.indexOf('#'))), ...Array.from({ length: 40 }).map(() => '.')].slice(0, 40)
                    }
                    break
            }
        }
    }

    #tick = (action) => {
        console.log(this.sprite.join(''), this.cycle, this.cycle % this.cycleStep, '->', this.sprite.at(this.cycle % this.cycleStep), `\n\n${this.getSignalStrength()}\n`)
        this.sprites.push(this.sprite.at(this.cycle % this.cycleStep))
        this.cycle += 1
        console.log(`Start cycle ${this.cycle}: action`)
    }

    getSignalStrength = () => {
        let res = ''
        this.sprites.forEach((char, i) => {
            if ((i + 1) % this.cycleStep === 0) {
                res += char + '\n'
            } else {
                res += char
            }
        })
        return res
    }
}

const programSprite = new ProgramSprite()
programSprite.run()

console.log(programSprite.getSignalStrength())