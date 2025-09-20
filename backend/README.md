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

### Thought Process

- **Token-Bucket Simulation**:

  1. Initialize the bucket with `capacity` at the first request.
  2. For each request, calculate `elapsed = t - prevTime`.
  3. Refill tokens: `tokens = min(capacity, tokens + elapsed * refill_rate_per_sec)`.
  4. Decide:
     - If `tokens >= 1`, allow the request and consume 1 token.
     - Otherwise, deny the request.
  5. Record `{ t, allowed, tokens_after }` for each request.

- **Edge Cases Considered**:

  - Multiple requests at the same timestamp.
  - Fractional refill rates.
  - Bucket refill exceeding capacity.
  - Empty request list.

- **Design Choices / Trade-offs**:
  - Chose **offline simulation** using a single array iteration for simplicity.
  - Rounded `tokens_after` to 6 decimal places to avoid floating-point precision issues.
  - Did not validate JSON structure beyond parsing; the assessment did not require it.
