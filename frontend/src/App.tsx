import { ChatTimeline } from "./ChatTimeline";
import type { Input } from "./types";

const input: Input = {
  currentUserId: "u1",
  readAt: "2025-06-13T00:30:30Z",
  messages: [
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
    },
    {
      id: "m3",
      authorId: "u2",
      text: "Ping!",
      createdAt: "2025-06-12T09:05:00Z",
    },
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
    },
    {
      id: "m7",
      authorId: "u1",
      text: "Meeting at 12:45?",
      createdAt: "2025-06-12T12:29:59Z",
    },
    {
      id: "m8",
      authorId: "u2",
      text: "Yes!",
      createdAt: "2025-06-12T12:30:31Z",
    },
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
      createdAt: "2025-06-13T00:01:59Z",
    },
    {
      id: "m11",
      authorId: "u2",
      text: "Morning!",
      createdAt: "2025-06-13T02:05:00Z",
    },
    {
      id: "m12",
      authorId: "u3",
      text: "Hey!",
      createdAt: "2025-06-13T02:05:01Z",
    },
    {
      id: "m13",
      authorId: "u4",
      text: "Project done",
      createdAt: "2025-06-14T23:58:00Z",
    },
    {
      id: "m14",
      authorId: "u3",
      text: "Great work team",
      createdAt: "2025-06-15T00:01:00Z",
    },
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
