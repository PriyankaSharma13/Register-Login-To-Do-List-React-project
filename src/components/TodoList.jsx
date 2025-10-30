import React, { useState } from 'react';
import styles from '../css/TodoList.module.css';
import { CheckCircle2, Trash2, Plus, SquareCheck, Trash, SquarePen } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTask = () => {
    if (inputValue.trim() === '') {
      toast.error('Please enter a task!');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
    toast.success('Task added successfully');

  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
        toast.info('Task status updated ');

  };

const handleCompleteAll = () => {
  if (tasks.length === 0) {
      toast.warn('No tasks to complete!');
      return;
    }
  const updatedTasks = tasks.map(task => ({
    ...task,
    completed: true,
  }));
  setTasks(updatedTasks);
   toast.success('All tasks marked as complete!');
};

const handleClearCompleted = () => {
  const updatedTasks = tasks.filter(task => !task.completed);
  setTasks(updatedTasks);
};

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
        toast.error('Task deleted');

  };

  const handleEditTask = (id, text) => {
    setEditingTaskId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim() === '') {
      toast.error('Task cannot be empty!');
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText } : task
      )
    );
    setEditingTaskId(null);
    setEditText('');
        toast.success('Task updated ');

  };

  return (
    <div className={styles.container}>
      <div className={styles.todo_app}>
        <h2> &#127775; To-Do List</h2>

        <div className={styles.todo_row_container}>
          <input
            type="text"
            className={styles.add_task}
            placeholder="What do you want to accomplish today?"
            onChange={handleInputChange}
            value={inputValue}
            onKeyUp={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button className={styles.add_btn} onClick={handleAddTask}>
            Add
          </button>
        </div>

        <div className={styles.mid_content}>
          <p className={styles.complete_all} onClick={handleCompleteAll}>
            <SquareCheck size={14} /> Complete all
          </p>
          <p className={styles.clear_all} onClick={handleClearCompleted}>
            <Trash size={14} /> Delete completed
          </p>
        </div>

        <ul className={styles.task_list}>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`${styles.task_item} ${task.completed ? styles.completed : ''}`}
            >
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                  className={styles.add_task}
                  autoFocus
                />
              ) : (
                <div
                  className={styles.task_content}
                  onClick={() => toggleTask(task.id)}
                >
                  <span>{task.text}</span>
                </div>
              )}

              <div>
                {editingTaskId === task.id ? (
                  <CheckCircle2
                    size={20}
                    color="#4ade80"
                    className={styles.edit_icon}
                    onClick={() => handleSaveEdit(task.id)}
                  />
                ) : (
                  <SquarePen
                    size={20}
                    className={styles.edit_icon}
                    onClick={() => handleEditTask(task.id, task.text)}
                  />
                )}
                <Trash2
                  size={20}
                  color="#f87171"
                  className={styles.delete_icon}
                  onClick={() => handleDeleteTask(task.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
            <ToastContainer position="top-right" autoClose={1500} hideProgressBar />

    </div>
  );
};

export default TodoList;
