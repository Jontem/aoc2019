export function run(input: ReadonlyArray<string>): string {
  return input
    .reduce((sum, entry) => sum + (Math.floor(parseInt(entry, 10) / 3) - 2  ), 0)
    .toString();
}
