import React, { useState, useEffect } from 'react';
import { todosApi } from './api/todos';
import { Todo } from './types/todo';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todosApi.getAll();
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Create or update todo
  const handleSubmit = async (todoData: any) => {
    try {
      if (editingTodo) {
        await todosApi.update(editingTodo.id, todoData);
        setEditingTodo(null);
      } else {
        await todosApi.create(todoData);
      }
      fetchTodos();
    } catch (err) {
      setError('Failed to save todo');
      console.error(err);
    }
  };

  // Toggle complete status
  const handleToggle = async (id: number, completed: boolean) => {
    try {
      await todosApi.toggleComplete(id, completed);
      fetchTodos();
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  // Delete todo
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await todosApi.delete(id);
        fetchTodos();
      } catch (err) {
        setError('Failed to delete todo');
        console.error(err);
      }
    }
  };

  // Set todo for editing
  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="App" style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        📝 Todo List App
      </h1>

      {error && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '5px'
        }}>
          {error}
        </div>
      )}

      <TodoForm 
        onSubmit={handleSubmit} 
        editingTodo={editingTodo}
        onCancelEdit={handleCancelEdit}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Loading todos...
        </div>
      ) : (
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;