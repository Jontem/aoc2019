type OpCode = 1 | 2 | 99;

export function run(input: ReadonlyArray<string>): string {
  const originalProgram = input[0].split(",").map(c => parseInt(c, 10));

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const program = originalProgram.concat();
      program[1] = noun;
      program[2] = verb;

      let i = 0;
      while (true) {
        const opCode = program[i] as OpCode;
        if (opCode === 99) {
          break;
        }

        const left = program[program[i + 1]];
        const right = program[program[i + 2]];
        const outputIndex = program[i + 3];
        program[outputIndex] = calculate(opCode, left, right);
        if (program[0] == 19690720) {
          return (100 * noun + verb).toString();
        }
        i = i + 4;
      }
    }
  }

  return "nono";
}

function calculate(opCode: 1 | 2, left: number, right: number): number {
  switch (opCode) {
    case 1: {
      return left + right;
    }
    case 2: {
      return left * right;
    }
    default: {
      throw new Error("Invalid opcode");
    }
  }
}
