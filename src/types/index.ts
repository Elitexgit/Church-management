export interface User {
  name: string;
  avatar?: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface Meal {
  name: string;
  description: string;
  time: string;
}

export interface Program {
  id: string;
  title: string;
  speaker: string;
  time: string;
  date: string;
  description: string;
}

export interface Message {
  id: string;
  title: string;
  content: string;
  date: string;
  sender: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'document';
  url: string;
  thumbnail?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
