"use client";

import { useState } from "react";
import { CommentType } from "./commentType";

export default function Reply({
  comment,
  onAddReply,
}: {
  comment: CommentType;
  onAddReply: (id: number, message: string) => void;
}) {
  const [inputReply, setInputReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  const handleChangeReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputReply(e.target.value);
  };

  const handleAddReply = () => {
    if (inputReply.trim() === "") {
      return;
    }
    onAddReply(comment.id, inputReply);
    setInputReply("");
    setShowReply(false);
  };

  return (
    <section>
      <div>
        <span>{comment.message}</span>
        <button
          onClick={() => setShowReply(true)}
          style={{ marginLeft: "10px" }}
        >
          Reply
        </button>
      </div>
      {showReply && (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter reply..."
            value={inputReply}
            onChange={handleChangeReply}
          />
          <button onClick={handleAddReply}>Save</button>
        </div>
      )}
      <div style={{ marginLeft: "10px", marginTop: "10px" }}>
        {comment?.replies.map((reply) => {
          return (
            <Reply key={reply.id} comment={reply} onAddReply={onAddReply} />
          );
        })}
      </div>
    </section>
  );
}
