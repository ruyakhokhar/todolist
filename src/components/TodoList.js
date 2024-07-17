import React, { useState } from 'react'

export const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [activeTab, setActiveTab] = useState('todoList');

    const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        updateCompletedTodos(updatedTodos);
    };

    const updateCompletedTodos = (updatedTodos) => {
        const completed = updatedTodos.filter(todo => todo.completed);
        setCompletedTodos(completed);
    };

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            const newTask = {
                id: todos.length + 1,
                text: newTodo,
                completed: false
            };
            setTodos([...todos, newTask]);
            setNewTodo('');
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const uncompletedTodos = todos.filter(todo => !todo.completed);

    return (
        <div className="App">
            <div className="tabs">
                <div
                    className={`tab ${activeTab === 'todoList' ? 'active' : ''}`}
                    onClick={() => handleTabChange('todoList')}
                >
                    Todo list
                </div>
                <div
                    className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => handleTabChange('history')}
                >
                    History
                </div>
            </div>

            <div className="content">
                {activeTab === 'todoList' && (
                    <div>
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="My todos for the day..."
                        />
                        <button onClick={handleAddTodo}>Add</button>
                    </div>
                )}

                <ul>
                    {activeTab === 'history'
                        ? completedTodos.map(todo => (
                            <li className='todolist-tab' key={todo.id}>
                                <span>{todo.text}</span>
                                <input
                                    type="checkbox"
                                    checked={true}

                                />
                            </li>
                        ))
                        : uncompletedTodos.map(todo => (
                            <li key={todo.id}>
                                <span>{todo.text}</span>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleComplete(todo.id)}
                                />
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}
