export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  date: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown or multi-paragraph text
  category: string;
  imageUrl: string;
  imageCaption?: string;
  author: string;
  publishedAt: string;
  readTime: string;
  highlights?: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  views: number;
  likes: number;
  comments: Comment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}
