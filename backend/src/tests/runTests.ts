import { simulate, SolveInput } from "../simulator";
import { readFileSync } from "fs";
import path from "path";

const testCases = ["case1.json", "case2.json", "case3.json", "case4.json", "case5.json"];

testCases.forEach((file) => {
  const filePath = path.join(__dirname, file);
  const input: SolveInput = JSON.parse(readFileSync(filePath, "utf-8"));

  console.log(`\nRunning ${file} ...`);
  const result = simulate(input);
  console.log(JSON.stringify(result, null, 2));
});
