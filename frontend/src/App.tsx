import { ChatTimeline } from "./ChatTimeline";
import type { Input } from "./types";

const input: Input = {
  currentUserId: "u1",
  readAt: "2025-06-12T12:30:30Z",
  messages: [
    // Day 1
    {
      id: "m1",
      authorId: "u2",
      text: "Hello!",
      createdAt: "2025-06-12T09:00:00Z",
    },
    {
      id: "m2",
      authorId: "u2",
      text: "Are you there?",
      createdAt: "2025-06-12T09:01:59Z",
    }, // within 2 min → same bubble
    {
      id: "m3",
      authorId: "u2",
      text: "Ping!",
      createdAt: "2025-06-12T09:05:00Z",
    }, // >2 min → new bubble
    {
      id: "m4",
      authorId: "u1",
      text: "Yes!",
      createdAt: "2025-06-12T09:05:30Z",
    },
    {
      id: "m5",
      authorId: "u3",
      text: "Hey folks",
      createdAt: "2025-06-12T09:06:00Z",
    },
    {
      id: "m6",
      authorId: "u3",
      text: "What's up?",
      createdAt: "2025-06-12T09:06:00Z",
    }, // same timestamp → tie breaker by id

    // Messages around readAt (for unread divider)
    {
      id: "m7",
      authorId: "u1",
      text: "Meeting at 12:45?",
      createdAt: "2025-06-12T12:29:59Z",
    }, // before readAt → not unread
    {
      id: "m8",
      authorId: "u2",
      text: "Yes!",
      createdAt: "2025-06-12T12:30:31Z",
    }, // after readAt → triggers unread divider

    // Day 2
    {
      id: "m9",
      authorId: "u1",
      text: "Good morning!",
      createdAt: "2025-06-13T00:00:00Z",
    },
    {
      id: "m10",
      authorId: "u1",
      text: "How's everyone?",
      createdAt: "2025-06-13T00:04:59Z",
    }, // within 5 min → same bubble
    {
      id: "m11",
      authorId: "u2",
      text: "Morning!",
      createdAt: "2025-06-13T00:05:00Z",
    },
    {
      id: "m12",
      authorId: "u3",
      text: "Hey!",
      createdAt: "2025-06-13T00:05:01Z",
    },

    // Day 3
    {
      id: "m13",
      authorId: "u1",
      text: "Project done",
      createdAt: "2025-06-14T23:58:00Z",
    },
    {
      id: "m14",
      authorId: "u1",
      text: "Great work team",
      createdAt: "2025-06-15T00:01:00Z",
    }, // cross midnight → new day separator
  ],
};

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Chat Timeline</h1>
      <ChatTimeline input={input} />
    </div>
  );
}

export default App;
