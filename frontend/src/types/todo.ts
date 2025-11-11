export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  category: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  category?: string;
  due_date?: string;
}