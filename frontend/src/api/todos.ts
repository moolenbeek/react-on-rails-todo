import axios from 'axios';
import { Todo, CreateTodoInput } from '../types/todo';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const todosApi = {
  getAll: () => axios.get<Todo[]>(`${API_BASE_URL}/todos`),
  
  getOne: (id: number) => axios.get<Todo>(`${API_BASE_URL}/todos/${id}`),
  
  create: (todo: CreateTodoInput) => 
    axios.post<Todo>(`${API_BASE_URL}/todos`, { todo }),
  
  update: (id: number, todo: Partial<CreateTodoInput>) => 
    axios.patch<Todo>(`${API_BASE_URL}/todos/${id}`, { todo }),
  
  delete: (id: number) => 
    axios.delete(`${API_BASE_URL}/todos/${id}`),
  
  toggleComplete: (id: number, completed: boolean) =>
    axios.patch<Todo>(`${API_BASE_URL}/todos/${id}`, { 
      todo: { completed } 
    })
};