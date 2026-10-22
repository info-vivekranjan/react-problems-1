"use client";

import React, { useState } from "react";
import { CommentDataType } from "./CommentReplyType";

export default function Replies({
  comment,
  onAddReply,
}: {
  comment: CommentDataType;
  onAddReply: (message: string, parentId: number) => void;
}) {
  const [replyInput, setReplyInput] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleChangeReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReplyInput(value);
  };

  const handleAddReply = () => {
    if (replyInput.trim() === "") {
      return;
    }

    onAddReply(replyInput, comment.id);
    setReplyInput("");
    setShowReplyInput(false);
  };

  return (
    <section style={{ marginTop: "15px" }}>
      <span>{comment.message}</span>
      <button onClick={() => setShowReplyInput(true)}>Reply</button>

      {showReplyInput && (
        <div>
          <input
            type="text"
            placeholder="Add reply"
            name="reply"
            id="reply"
            value={replyInput}
            onChange={handleChangeReply}
          />
          <button onClick={handleAddReply}>Save</button>
        </div>
      )}
      <div style={{ marginLeft: "15px", marginTop: "15px" }}>
        {comment.replies.map((item) => {
          return (
            <Replies key={item.id} comment={item} onAddReply={onAddReply} />
          );
        })}
      </div>
    </section>
  );
}
