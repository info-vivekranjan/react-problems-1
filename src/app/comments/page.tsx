"use client";

import { useState } from "react";
import { CommentType } from "./commentType";
import Reply from "./Reply";

export default function Comments() {
  const [commentData, setCommentData] = useState<CommentType[]>([]);
  const [inputComment, setInputComment] = useState("");

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(e.target.value);
  };

  const handleComment = () => {
    if (inputComment.trim() === "") {
      return;
    }

    const payload: CommentType = {
      id: Date.now(),
      message: inputComment,
      date: new Date().toLocaleDateString(),
      replies: [],
    };
    setCommentData((prev) => [...prev, payload]);
    setInputComment("");
  };

  //ADD REPLY

  const handleAddReply = (
    comments: CommentType[],
    parentId: number,
    payload: CommentType,
  ): CommentType[] => {
    return comments?.map((comment) => {
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

  const onAddReply = (parentId: number, message: string) => {
    console.log(parentId, message);
    const payload: CommentType = {
      id: Date.now(),
      message: message,
      date: new Date().toLocaleDateString(),
      replies: [],
    };

    setCommentData((prev) => handleAddReply(prev, parentId, payload));
  };

  //DELETE REPLY

  const handleDeleteReply = (
    comments: CommentType[],
    parentId: number,
  ): CommentType[] => {
    return comments
      .filter((item) => item.id !== parentId)
      .map((comment) => {
        return {
          ...comment,
          replies: handleDeleteReply(comment.replies, parentId),
        };
      });
  };

  const onDeleteReply = (parentId: number) => {
    setCommentData((prev) => handleDeleteReply(prev, parentId));
  };

  console.log(commentData);

  return (
    <>
      <h1>Nested Comment Reply</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter comment..."
          value={inputComment}
          onChange={handleChangeComment}
        />
        <button onClick={handleComment}>Comment</button>
      </div>

      {commentData?.map((comment) => {
        return (
          <Reply
            key={comment.id}
            comment={comment}
            onAddReply={onAddReply}
            onDeleteReply={onDeleteReply}
          />
        );
      })}
    </>
  );
}
