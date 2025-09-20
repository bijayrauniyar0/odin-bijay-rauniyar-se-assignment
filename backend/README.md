# Token-Bucket Rate Limiter CLI

## Setup & Run

1. Install dependencies:

```
npm install
```

2. Run CLI with any input JSON file:

```
npx ts-node src/cli.ts <path-to-your-file.json>
```

Example:

```
npx ts-node src/cli.ts example.json
```

- The input JSON must follow the format:

```
{
  "capacity": <number>,
  "refill_rate_per_sec": <number>,
  "requests": [<number>, ...]
}
```

3. Run all predefined test cases:

```
npx ts-node src/tests/runTests.ts
```

This will run all must-pass test cases (`case1.json`, `case2.json`, etc.) and print the outputs.

## Assumptions / Trade-offs

- First request assumes bucket is full.
- Tokens refill continuously, can be fractional.
- Each request consumes 1 token if allowed.
- CLI chosen for simplicity over HTTP server.
- No external DB or libraries (minimal dependencies).

## Edge Cases Covered

- Multiple requests at the same timestamp.
- Fractional refill rates.
- Bucket refill exceeding capacity.
- Empty request list.

## Test / Run Examples

**Input (`example.json`):**

```json
{
  "capacity": 5,
  "refill_rate_per_sec": 2,
  "requests": [0, 0.1, 0.2, 1.5]
}
```

**CLI Run:**

```bash
npx ts-node src/cli.ts example.json
```

**Output:**

```json
[
  { "t": 0, "allowed": true, "tokens_after": 4 },
  { "t": 0.1, "allowed": true, "tokens_after": 3.2 },
  { "t": 0.2, "allowed": true, "tokens_after": 2.4 },
  { "t": 1.5, "allowed": true, "tokens_after": 4 }
]
```
