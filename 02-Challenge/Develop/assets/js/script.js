// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const uniqueId = Math.random().toString(36).substring(2, 9);
  const timestamp = Date.now().toString(36);
  return uniqueId + timestamp;
}

// Todo: create a function to create a task card
function createTaskCard() {
  const card = $('<div>')
  .addClass('card task-card draggable my-3')
  .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.type);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.type)
  const cardDueDate = $('<p>').addClass('card-text').text(task.duedate);
  const cardDeleteBtn = $('<button>')
  .addClass('btn btn-danger delete')
  .text('Delete')
  .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);
  // elementTitle.textContent = title;
  // const elementdescription = document.createElement("p");
  // elementdescription.textContent = description;
  // const elementdeadline = document.createElement("p");
  // elementdeadline.textContent = `Deadline: ${deadline}`;
  // card.addEventListener('click', () => {
  //   card.remove();
  // });
  // card.appendChild(elementTitle);
  // card.appendChild(elementdescription);
  // card.appendChild(elementdeadline);
  // return card;
}

// Todo: create a function to render the task list and make cards draggable

function renderTaskList() {
  const taskContainer = document.getElementById('task-list');
  taskContainer.innerHTML = '';

  taskList.forEach(task => {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.id = task.id;
    taskCard.draggable = true;
    taskCard.innerText = task.name;

    taskCard.addEventListener('dragstart', onDragStart);
    taskCard.addEventListener('dragover', onDragOver);
    taskCard.addEventListener('drop', onDrop);

    taskContainer.appendChild(taskCard);
  });
}
function onDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.currentTarget.style.opacity = '0.5';
}
function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.style.backgroundColor = '';
  
  if (dropzone.className === 'task-card') {
    const parent = dropzone.parentNode;
    parent.insertBefore(draggableElement, dropzone.nextSibling);
  } else {
    dropzone.appendChild(draggableElement);
  }
  
  event.dataTransfer.clearData();
}
// Todo: create a function to handle adding a new task
const modal = document.getElementById('myModal');
const btn = document.getElementById('add-task-btn');
const span = document.getElementsByClassName('close')[0];
const form = document.getElementById('task-form');

btn.onclick = () => {
  modal.style.display = 'block';
}
span.onclick = () => {
  modal.style.display = ''
}
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

function handleAddTask(event) {
  event.preventDefault();
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;
  const deadline = document.getElementById('task-deadline').value;
  const newTaskCard = createTaskCard(title, description, deadline);
  taskContainer.appendChild(newTaskCard);
  modal.style.display = 'none';
  form.reset();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
