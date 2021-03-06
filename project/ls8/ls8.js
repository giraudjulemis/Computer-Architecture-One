const fs = require('fs');

const RAM = require('./ram');
const CPU = require('./cpu');

/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory() {
    const filename = process.argv[2];
    const program = fs;

    program.readFileSync(filename)
      .toString()
      .split('\n')
      .reduce((memo, line) => {
        if (line[0] !== '#' && line[0] !== '') {
          return memo.concat(line.slice(0, 8));
        }
        return memo;
      }, []);

    // Load the program into the CPU's memory a byte at a time
    for (let i = 0; i < program.length; i++) {
        cpu.poke(i, parseInt(program[i], 2));
    }
}

/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);

// TODO: get name of ls8 file to load from command line

loadMemory(cpu);

cpu.startClock();
