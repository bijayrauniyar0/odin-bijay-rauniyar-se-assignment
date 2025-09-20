# Chat Timeline Component

## Overview

This project implements a **chat timeline component** in React + TypeScript. It focuses on **logic and correct grouping**, including:

- Grouping consecutive messages by the same author within a **2 minute window**.
- Displaying **day separators** when the date changes.
- Displaying an **"Unread" divider** for messages after the user's `readAt` timestamp.
- Handling **messages with the same timestamp** (tie-breaker by `id`).
- Highlighting **current user messages** (alignment right).

Minimal inline styling is applied for clarity. No backend or styling frameworks are used.

## Setup & Run

1. Install dependencies:

```
npm install
```

2. Start development server:

```
npm run dev
```

3. Open http://localhost:3000 in your browser.

## How to Test with Custom Input

1. Open `src/App.tsx`.
2. Replace the `input` object with your own messages:

```typescript
const input: Input = {
  currentUserId: "u1",
  readAt: "2025-06-12T12:30:30Z",
  messages: [
    { id: "m1", authorId: "u2", text: "Hello!", createdAt: "2025-06-12T09:00:00Z" },
    ...
  ]
};
```

3. Save and check the rendered timeline. Messages will automatically:
   - Sort by timestamp
   - Group into bubbles
   - Add day separators and unread divider

## Assumptions / Trade-offs

- Bubble grouping threshold is **2 minutes** (can adjust to 5 minutes if needed).
- Minimal styling; focus is **logic, not UI/UX**.
- Messages with identical timestamps are sorted by **id**.
- Messages with fractional seconds are supported.

## Edge Cases Covered

- Consecutive messages from same author within grouping window.
- Messages more than 2 minutes apart → new bubble.
- Messages with **exact same timestamp** → tie-breaker by id.
- **Unread divider** placement.
- **Crossing midnight / multiple days**.
- **Fractional seconds** in timestamps.
- Empty message list.

## Test / Example Usage

```typescript
<ChatTimeline input={input} />
```

**Where** `input` includes messages across multiple days, multiple authors, same timestamps, and unread messages.

### Thought Process

- **Sorting**:

  - Messages are sorted by `createdAt` ascending.
  - `id` is used as a tie-breaker for messages with identical timestamps.

- **Bubble Grouping**:

  - Consecutive messages from the same author within **2 minutes** are grouped into a single bubble.
  - Each message is stacked vertically inside the bubble.
  - Author is displayed only once per bubble.

- **Day Separators**:

  - Inserted whenever the date changes between consecutive messages.

- **Unread Divider**:

  - Placed **before the first message from another user** strictly after `readAt`.
  - Messages from the current user are never marked as unread.

- **Edge Cases Covered**:
  - Messages with exact same timestamp → tie-breaker by id.
  - Messages crossing midnight → new day separator.
  - Fractional seconds in timestamps.
  - Empty message list.
  - Consecutive messages by same user spanning multiple days.
