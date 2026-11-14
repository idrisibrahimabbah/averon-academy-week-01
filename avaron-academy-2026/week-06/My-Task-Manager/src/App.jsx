import { useEffect, useState } from 'react'

import './App.css'



function App() {
  // Load saved tasks when the app starts
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("todo-tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  // Save tasks whenever the task list changes
  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  function addTask(event) {
    event.preventDefault();

    const trimmedTask = taskInput.trim();

    if (!trimmedTask) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: trimmedTask,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    setTaskInput("");
  }

  // Mark a task as completed or active
  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Delete a task
  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  // Display tasks according to the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main className="app">
      <section className="todo-container">
        <header className="app-header">
          <h1>My Task Manager</h1>
          <p>Organise your tasks and stay productive.</p>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Enter a new task..."
            value={taskInput}
            onChange={(event) => setTaskInput(event.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>

        <div className="task-summary">
          <span>Total: {tasks.length}</span>
          <span>Completed: {completedCount}</span>
          <span>Remaining: {tasks.length - completedCount}</span>
        </div>

        <div className="filter-buttons">
          {["all", "active", "completed"].map((option) => (
            <button
              key={option}
              type="button"
              className={filter === option ? "selected" : ""}
              onClick={() => setFilter(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        <ul className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className={task.completed ? "completed" : ""}
              >
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.title}</span>
                </label>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li className="empty-message">
              {tasks.length === 0
                ? "No tasks yet. Add your first task!"
                : "No tasks found in this category."}
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}

export default App;
