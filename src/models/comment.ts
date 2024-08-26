/** Regex which finds all mentions -- @ followed by word */
export const MentionPattern = /@(\w+)/g;

export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
}
