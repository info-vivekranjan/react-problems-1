"use client";

import React, { useState } from "react";
import { CommentDataType } from "./CommentReplyType";
import Replies from "./Replies";

export default function Comment() {
  const [commentInput, setCommentInput] = useState("");
  const [commentData, setCommentData] = useState<CommentDataType[]>([]);

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCommentInput(value);
  };

  const handleAddComment = () => {
    if (commentInput.trim() === "") {
      return;
    }

    const payload = {
      id: Date.now(),
      message: commentInput,
      date: new Date().toString(),
      replies: [],
    };

    setCommentData((prev) => [...prev, payload]);
    setCommentInput("");
  };

  //ADD REPLY

  const handleAddReply = (
    comments: CommentDataType[],
    parentId: number,
    payload: CommentDataType,
  ): CommentDataType[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, payload],
        };
      }

      return {
        ...comment,
        replies: handleAddReply(comment.replies, parentId, payload),
      };
    });
  };

  const onAddReply = (message: string, parentId: number) => {
    console.log(message, parentId);

    const payload = {
      id: Date.now(),
      message: message,
      date: new Date().toString(),
      replies: [],
    };

    setCommentData((prev) => handleAddReply(prev, parentId, payload));
  };

  console.log(commentData);

  return (
    <>
      <h1>Comment Reply</h1>
      <div>
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Add Comment"
          value={commentInput}
          onChange={handleChangeComment}
        />
        <button onClick={handleAddComment}>Save</button>
      </div>
      {commentData?.map((comment) => {
        return (
          <Replies key={comment.id} comment={comment} onAddReply={onAddReply} />
        );
      })}
    </>
  );
}
