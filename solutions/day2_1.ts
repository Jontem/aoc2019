type OpCode = 1 | 2 | 99;

export function run(input: ReadonlyArray<string>): string {
  const program = input[0].split(",").map(c => parseInt(c, 10));
  program[1] = 12;
  program[2] = 2;

  let i = 0;
  while (true) {
    const opCode = program[i] as OpCode;
    if (opCode === 99) {
      return program[0].toString();
    }

    const left = program[program[i + 1]];
    const right = program[program[i + 2]];
    const outputIndex = program[i + 3];
    program[outputIndex] = calculate(opCode, left, right);
    i = i + 4;
  }
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
