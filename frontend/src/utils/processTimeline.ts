import type { Input, Message, TimelineItem } from "../types";

export function processTimeline(input: Input): TimelineItem[] {
  const { messages, currentUserId, readAt } = input;
  if (!messages || messages.length === 0) return [];

  // 1. Sort messages by createdAt, tie-breaker by id
  const sorted = [...messages].sort((a, b) => {
    const t1 = new Date(a.createdAt).getTime();
    const t2 = new Date(b.createdAt).getTime();
    if (t1 !== t2) return t1 - t2;
    return a.id.localeCompare(b.id);
  });

  const timeline: TimelineItem[] = [];
  let prevDate = "";
  let bubbleMessages: Message[] = [];
  let prevAuthor = "";
  let prevTime = 0;
  let unreadInserted = false;

  const readTimestamp = readAt ? new Date(readAt).getTime() : 0;

  for (const msg of sorted) {
    const msgTime = new Date(msg.createdAt).getTime();
    const msgDate = msg.createdAt.split("T")[0]; // YYYY-MM-DD

    // 2. Insert day separator if date changed
    if (msgDate !== prevDate) {
      if (bubbleMessages.length > 0) {
        timeline.push({
          type: "bubble",
          authorId: prevAuthor,
          messages: bubbleMessages,
          isCurrentUser: prevAuthor === currentUserId,
        });
        bubbleMessages = [];
      }
      timeline.push({ type: "day-separator", date: msgDate });
      prevDate = msgDate;
      prevAuthor = "";
      prevTime = 0;
    }

    // 3. Insert unread divider if not inserted and message after readAt
    if (!unreadInserted && readAt && msgTime > readTimestamp) {
      if (bubbleMessages.length > 0) {
        timeline.push({
          type: "bubble",
          authorId: prevAuthor,
          messages: bubbleMessages,
          isCurrentUser: prevAuthor === currentUserId,
        });
        bubbleMessages = [];
      }
      timeline.push({ type: "unread-divider" });
      unreadInserted = true;
      prevAuthor = "";
      prevTime = 0;
    }

    // 4. Group into bubbles (same author within 2 minutes)
    if (msg.authorId === prevAuthor && msgTime - prevTime <= 2 * 60 * 1000) {
      bubbleMessages.push(msg);
    } else {
      if (bubbleMessages.length > 0) {
        timeline.push({
          type: "bubble",
          authorId: prevAuthor,
          messages: bubbleMessages,
          isCurrentUser: prevAuthor === currentUserId,
        });
      }
      bubbleMessages = [msg];
      prevAuthor = msg.authorId;
    }
    prevTime = msgTime;
  }

  // Push any remaining bubble
  if (bubbleMessages.length > 0) {
    timeline.push({
      type: "bubble",
      authorId: prevAuthor,
      messages: bubbleMessages,
      isCurrentUser: prevAuthor === currentUserId,
    });
  }

  return timeline;
}
