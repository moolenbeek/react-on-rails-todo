import React, { useState, useEffect } from 'react';
import { Todo } from '../types/todo';

interface TodoFormProps {
  onSubmit: (todo: any) => void;
  editingTodo: Todo | null;
  onCancelEdit: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, editingTodo, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || '');
      setCategory(editingTodo.category || '');
      setDueDate(editingTodo.due_date || '');
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    const todoData = {
      title,
      description: description || undefined,
      category: category || undefined,
      due_date: dueDate || undefined
    };

    onSubmit(todoData);
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setDueDate('');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setDueDate('');
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '5px',
      marginBottom: '20px'
    }}>
      <h3>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            fontSize: '14px'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            fontSize: '14px',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            fontSize: '14px'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            fontSize: '14px'
          }}
        />
      </div>

      <div>
        <button 
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          {editingTodo ? 'Update' : 'Add'} Todo
        </button>
        
        {editingTodo && (
          <button 
            type="button"
            onClick={handleCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;