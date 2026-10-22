"use client";

import React, { useState } from "react";
import { CommentDataType } from "./CommentReplyType";

export default function Replies({
  comment,
  onAddReply,
  onDeleteReply,
  onEditReply,
}: {
  comment: CommentDataType;
  onAddReply: (message: string, parentId: number) => void;
  onDeleteReply: (parentId: number) => void;
  onEditReply: (message: string, parentId: number) => void;
}) {
  const [replyInput, setReplyInput] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyEditInput, setReplyEditInput] = useState(comment.message);
  const [showReplyEditInput, setShowReplyEditInput] = useState(false);

  const handleChangeReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReplyInput(value);
  };

  const handleChangeEditReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReplyEditInput(value);
  };

  const handleAddReply = () => {
    if (replyInput.trim() === "") {
      return;
    }

    onAddReply(replyInput, comment.id);
    setReplyInput("");
    setShowReplyInput(false);
  };

  const handleDelete = () => {
    onDeleteReply(comment.id);
  };

  const handleEditReply = () => {
    if (replyEditInput.trim() === "") {
      return;
    }
    onEditReply(replyEditInput, comment.id);
    setShowReplyEditInput(false);
  };

  return (
    <section style={{ marginTop: "15px" }}>
      {showReplyEditInput ? (
        <>
          <input
            type="text"
            placeholder="Edit reply"
            name="edit-reply"
            id="edit-reply"
            value={replyEditInput}
            onChange={handleChangeEditReply}
          />
          <button onClick={handleEditReply}>Save</button>
        </>
      ) : (
        <span>{comment.message}</span>
      )}
      <button onClick={() => setShowReplyInput(true)}>Reply</button>
      <button onClick={handleDelete}>Delete</button>
      {!showReplyEditInput && (
        <button onClick={() => setShowReplyEditInput(true)}>Edit</button>
      )}

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
            <Replies
              key={item.id}
              comment={item}
              onAddReply={onAddReply}
              onDeleteReply={onDeleteReply}
              onEditReply={onEditReply}
            />
          );
        })}
      </div>
    </section>
  );
}
