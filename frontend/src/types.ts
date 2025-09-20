export type Message = {
  id: string;
  authorId: string;
  text: string;
  createdAt: string; // ISO timestamp
};

export type Input = {
  messages: Message[];
  currentUserId: string;
  readAt?: string; // ISO timestamp
};

export type TimelineItem =
  | { type: "day-separator"; date: string }
  | { type: "unread-divider" }
  | {
      type: "bubble";
      authorId: string;
      messages: Message[];
      isCurrentUser: boolean;
    };
