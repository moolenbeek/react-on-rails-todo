import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <div className="todo-item" style={{
      padding: '15px',
      margin: '10px 0',
      border: '1px solid #ddd',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: todo.completed ? '#f0f0f0' : 'white'
    }}>
      <div style={{ flex: 1 }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          style={{ marginRight: '10px' }}
        />
        <span style={{ 
          textDecoration: todo.completed ? 'line-through' : 'none',
          fontWeight: 'bold'
        }}>
          {todo.title}
        </span>
        {todo.category && (
          <span style={{ 
            marginLeft: '10px', 
            padding: '2px 8px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '3px',
            fontSize: '12px'
          }}>
            {todo.category}
          </span>
        )}
        {todo.description && (
          <p style={{ margin: '5px 0', color: '#666' }}>{todo.description}</p>
        )}
        {todo.due_date && (
          <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>
            Due: {new Date(todo.due_date).toLocaleDateString()}
          </p>
        )}
      </div>
      <div>
        <button 
          onClick={() => onEdit(todo)}
          style={{ 
            marginRight: '5px', 
            padding: '5px 10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(todo.id)}
          style={{ 
            padding: '5px 10px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;