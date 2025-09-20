# Fullstack Assignment Repository

## Overview

This repository contains **both backend and frontend assignments** for a technical assessment. The projects are separated into their respective folders:

```
/backend    → Node.js TypeScript token-bucket rate limiter (CLI version)
/frontend   → React TypeScript chat timeline component
```

Each folder has its **own detailed README** with setup instructions, usage examples, and edge case explanations.

## Setup & Run

1. **Clone the repository:**

```
git clone git@github.com:bijayrauniyar0/odin-bijay-rauniyar-se-assignment.git
cd odin-bijay-rauniyar-se-assignment
```

2. **Backend**

```
cd backend
npm install
# Run CLI example
npx ts-node src/cli.ts example.json
```

For detailed instructions, test cases, and additional info, see `/backend/README.md`.

3. **Frontend**

```
cd frontend
npm install
npm start
```

For detailed instructions, input configuration, and edge case examples, see `/frontend/README.md`.

## Repository Contents

- **backend/**

  - Implements a **token-bucket rate limiter simulator**
  - CLI-based solution
  - Handles fractional refill rates and multiple test cases

- **frontend/**
  - Implements a **chat timeline component** in React + TypeScript
  - Groups messages into bubbles, adds day separators and unread divider
  - Handles multiple edge cases including same timestamp, consecutive messages, and crossing days

## Notes

- Each project is **self-contained**.
- Refer to respective README files for **detailed instructions, assumptions, and examples**.
