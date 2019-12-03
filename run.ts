import * as fs from "fs";
import fetch from "node-fetch";
const usage = `Usage: <day>`;
const cliArgs = process.argv.slice(2);
const day = parseInt(cliArgs[0], 10);

if (!isFinite(day)) {
  console.log(`Please specify which day to run`);
  console.log(usage);
  process.exit(1);
}

const cookie = "todo";

interface PartModule {
  run: (input: string) => void;
}

(async () => {
  const input = await getInput(day, cookie);
  await runPart(input, 1);
  await runPart(input, 2);
})();

async function runPart(input: string, part: number): Promise<void> {
  const partModulePath = `./${day}/${part}.ts`;
  if (!fs.existsSync(partModulePath)) {
    console.log(`Couldn't find ${partModulePath}`);
    return;
  }
  console.log(`Running part ${part}:`);
  const module: PartModule = await import(partModulePath);
  const result = module.run(input);
  console.log(`Result: ${result}`);
}

async function getInput(day: number, cookie: string): Promise<string> {
  const cacheFile = `${day}/input`;
  if (!fs.existsSync(cacheFile)) {
    console.log("Input not cached. Fetching...");
    await fetch(getInputUrl(day), {
      headers: {
        cookie: cookie
      }
    })
      .then(res => res.text())
      .then(text => {
        fs.writeFileSync(cacheFile, text);
      });
  }

  return fs.readFileSync(cacheFile, { encoding: "utf8" }) as string;
}

function getInputUrl(day: number): string {
  return `https://adventofcode.com/2019/day/${day}/input`;
}
