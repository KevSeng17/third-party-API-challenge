// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const uniqueId = Math.random().toString(36).substring(2, 9);
}

// Todo: create a function to create a task card
function createTaskCard(title, description, deadline) {
  const card = document.createElement("div");
  card.classList.add("task-card");
  const elementTitle = document.createElement("h3");
  elementTitle.textContent = title;
  const description = document.createElement("p");
  description.textContent = description;
  const deadline = document.createElement("p");
  deadline.textContent = `Deadline: ${deadline}`;
  card.addEventListener('click', () => {
    card.remove();
  });
  card.appendChild(elementTitle);
  card.appendChild(description);
  card.appendChild(deadline);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
