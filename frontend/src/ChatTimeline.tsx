import React from "react";
import type { Input } from "./types";
import { processTimeline } from "./utils/processTimeline";

type Props = {
  input: Input;
};

export const ChatTimeline: React.FC<Props> = ({ input }) => {
  const timeline = processTimeline(input);
  console.log(timeline);

  return (
    <div>
      {timeline.map((item, idx) => {
        switch (item.type) {
          case "day-separator":
            return (
              <div key={idx} style={{ textAlign: "center", margin: "10px 0" }}>
                — {item.date} —
              </div>
            );
          case "unread-divider":
            return (
              <div
                key={idx}
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Unread
              </div>
            );
          case "bubble":
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: item.isCurrentUser ? "end" : "start",
                  margin: "10px 0",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: item.isCurrentUser ? "row-reverse" : "row",
                    gap: "0.5rem",
                    alignItems: "end",
                  }}
                >
                  <strong>{item.authorId}:</strong>{" "}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",

                      gap: "4px",
                    }}
                  >
                    {item.messages.map((m) => (
                      <span
                        style={{
                          borderRadius: "10px",
                          padding: "10px",
                          backgroundColor: item.isCurrentUser
                            ? "#DCF8C6"
                            : "#E6E6FA", // light purple for others
                        }}
                      >
                        {m.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
        }
      })}
    </div>
  );
};
