#!/usr/bin/env ts-node
import { readFileSync } from "fs";
import { simulate, SolveInput } from "./simulator";

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Usage: ts-node src/cli.ts <input.json>");
    process.exit(1);
  }

  const filePath = args[0];
  const raw = readFileSync(filePath, "utf-8");
  let input: SolveInput;
  try {
    input = JSON.parse(raw);
  } catch (err) {
    console.error("Error: Invalid JSON format.");
    process.exit(1);
  }

  const result = simulate(input);
  console.log(JSON.stringify(result, null, 2));
}

main();
