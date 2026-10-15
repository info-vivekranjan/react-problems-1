"use client";

import { useState } from "react";
import { CommentType } from "./commentType";

export default function Reply({
  comment,
  onAddReply,
  onDeleteReply,
  onEditReply,
}: {
  comment: CommentType;
  onAddReply: (id: number, message: string) => void;
  onDeleteReply: (id: number) => void;
  onEditReply: (id: number, message: string) => void;
}) {
  const [inputReply, setInputReply] = useState("");
  const [inputEditReply, setInputEditReply] = useState(comment.message);

  const [showReply, setShowReply] = useState(false);
  const [showEditReply, setShowEditReply] = useState(false);

  const handleChangeReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputReply(e.target.value);
  };

  const handleChangeEditReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditReply(e.target.value);
  };

  const handleAddReply = () => {
    if (inputReply.trim() === "") {
      return;
    }
    onAddReply(comment.id, inputReply);
    setInputReply("");
    setShowReply(false);
  };

  const handleDeleteReply = () => {
    onDeleteReply(comment.id);
  };

  const handleEditReply = () => {
    if (inputEditReply.trim() === "") {
      return;
    }

    onEditReply(comment.id, inputEditReply);
    setShowEditReply(false);
  };

  return (
    <section>
      <div>
        {showEditReply ? (
          <span>
            <input
              type="text"
              placeholder="Edit reply..."
              value={inputEditReply}
              onChange={handleChangeEditReply}
            />
            <button onClick={handleEditReply}>Save</button>
          </span>
        ) : (
          <span>{comment.message}</span>
        )}
        <button
          onClick={() => setShowReply(true)}
          style={{ marginLeft: "10px" }}
        >
          Reply
        </button>
        <button style={{ marginLeft: "10px" }} onClick={handleDeleteReply}>
          Delete
        </button>
        {!showEditReply && (
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setShowEditReply(true)}
          >
            Edit
          </button>
        )}
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
            <Reply
              key={reply.id}
              comment={reply}
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
