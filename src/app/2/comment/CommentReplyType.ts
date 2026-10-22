export interface CommentDataType {
  id: number;
  message: string;
  date: string;
  replies: CommentDataType[];
}
