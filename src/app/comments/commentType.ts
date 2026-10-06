export interface CommentType {
  id: number;
  message: string;
  date: string;
  replies: CommentType[];
}
