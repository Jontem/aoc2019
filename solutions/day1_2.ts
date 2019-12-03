export function run(input: ReadonlyArray<string>): string {
  return input
    .reduce(
      (sum, moduleMass) => sum + calculateFuel(parseInt(moduleMass, 10)),
      0
    )
    .toString();
}

function calculateFuel(moduleMass: number, totalFuel = 0): number {
  const fuel = Math.floor(moduleMass / 3) - 2;
  return fuel > 0 ? calculateFuel(fuel, totalFuel + fuel) : totalFuel;
}
