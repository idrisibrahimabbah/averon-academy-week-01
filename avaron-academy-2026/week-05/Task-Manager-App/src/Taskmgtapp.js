
// 1. Select HTML elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const sortTasks = document.getElementById("sortTasks");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// 2. Store tasks in an array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editingId = null;


// 3. Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// 4. Add a new task
function addTask() {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    // Edit existing task if in editing mode
    if (editingId !== null) {
        tasks = tasks.map(task => {
            if (task.id === editingId) {
                return { ...task, name: taskName };
            }

            return task;
        });

        editingId = null;
        addBtn.textContent = "Add Task";

    } else {
        // Create a new task object
        const newTask = {
            id: Date.now(),
            name: taskName,
            completed: false,
            createdAt: Date.now()
        };

        tasks.push(newTask);
    }

    taskInput.value = "";

    saveTasks();
    renderTasks();
}


// 5. Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    // Cancel editing if the deleted task was being edited
    if (editingId === id) {
        editingId = null;
        taskInput.value = "";
        addBtn.textContent = "Add Task";
    }

    saveTasks();
    renderTasks();
}


// 6. Edit a task
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    taskInput.value = task.name;
    editingId = id;

    addBtn.textContent = "Update Task";
    taskInput.focus();
}


// 7. Mark task as completed or pending
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();
    renderTasks();
}


// 8. Sort tasks
function getSortedTasks() {
    const sortedTasks = [...tasks];

    switch (sortTasks.value) {

        case "newest":
            return sortedTasks.sort(
                (a, b) => b.createdAt - a.createdAt
            );

        case "oldest":
            return sortedTasks.sort(
                (a, b) => a.createdAt - b.createdAt
            );

        case "az":
            return sortedTasks.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

        case "za":
            return sortedTasks.sort((a, b) =>
                b.name.localeCompare(a.name)
            );

        case "completed":
            return sortedTasks.sort(
                (a, b) => Number(b.completed) - Number(a.completed)
            );

        case "pending":
            return sortedTasks.sort(
                (a, b) => Number(a.completed) - Number(b.completed)
            );

        default:
            return sortedTasks;
    }
}


// 9. Display tasks on the webpage
function renderTasks() {

    // Clear the existing task list
    taskList.innerHTML = "";

    // Get sorted tasks
    const sortedTasks = getSortedTasks();

    if (sortedTasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No tasks available. Add a task!";
        taskList.appendChild(emptyMessage);
    }

    sortedTasks.forEach(task => {

        // Create list item
        const li = document.createElement("li");
        li.className = "task-item";

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        // Create task text
        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.name;

        if (task.completed) {
            span.classList.add("completed");
        }

        // Create edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", () => {
            editTask(task.id);
        });

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        // Append elements to list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        // Append list item to task list
        taskList.appendChild(li);
    });

    // Update task statistics
    updateStats();
}


// 10. Update task statistics
function updateStats() {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
    pendingTasks.textContent = `Pending: ${pending}`;
}


// 11. Event Listeners
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

sortTasks.addEventListener("change", renderTasks);


// 12. Display saved tasks when the app loads
renderTasks();
