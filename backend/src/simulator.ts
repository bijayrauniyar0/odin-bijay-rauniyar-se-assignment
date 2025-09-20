export interface SolveInput {
  capacity: number;
  refill_rate_per_sec: number;
  requests: number[];
}

export interface Decision {
  t: number;
  allowed: boolean;
  tokens_after: number;
}

export function simulate(input: SolveInput): Decision[] {
  const { capacity, refill_rate_per_sec, requests } = input;

  let tokens = capacity;
  let prevTime = requests.length > 0 ? requests[0] : 0;

  const results: Decision[] = [];

  for (let i = 0; i < requests.length; i++) {
    const t = requests[i];
    const elapsed = i === 0 ? 0 : t - prevTime;

    tokens = Math.min(capacity, tokens + elapsed * refill_rate_per_sec);

    let allowed = false;
    if (tokens >= 1) {
      allowed = true;
      tokens -= 1;
    }

    results.push({ t, allowed, tokens_after: Number(tokens.toFixed(6)) });
    prevTime = t;
  }

  return results;
}
