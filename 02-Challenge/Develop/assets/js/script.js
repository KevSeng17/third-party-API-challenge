const modalAddTaskBtn = document.getElementById("addTaskModalBtn");
// Retrieve tasks and nextId from localStorage
let taskList = [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
function displayCurrentTime() {
  $("#time-display").text(dayjs().format("YYYY-MM-DD HH:mm:ss"));
}


// Todo: create a function to generate a unique task id
function generateTaskId() {
  return ++nextId;
}
// Todo: create a function to create a task card
function createTaskCard(task) {
  const card = document.createElement("div");
  card.classList.add("task-card");
    const elementTitle = document.createElement("h3");
    elementTitle.textContent = task.name;
    const elementDescription = document.createElement("p");
    elementDescription.textContent = task.description;
    const elementDeadline = document.createElement("p");
    elementDeadline.textContent = `Deadline: ${task.deadline}`;
    card.append(elementTitle);
    card.append(elementDescription);
    card.append(elementDeadline);

  // Make the card draggable
  $(card).draggable();
  // card.draggable({
  //   revert: "invalid",
  //   helper: "clone",
  // });

  return card;
}

function saveTasksToStorage(taskList) {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// Todo: create a function to render the task list and make cards draggable

function renderTaskList() {
  for (const task of taskList) {
    const taskCard = createTaskCard(task);
    console.log(taskCard);
    $("#todo-cards").append(taskCard);
  }
}

// const taskContainer = $('#task-list');
// taskContainer.empty();
// taskList.forEach(task => {
//   const taskCard = createTaskCard(task);
//   taskContainer.append(taskCard);
//   taskCard.draggable({
//     containment: 'document',
//     helper: 'clone',
//     revert: 'invalid',
//   });
// });

// Todo: create a function to handle adding a new task
// const modal = document.getElementById("myModal");
const btn = document.getElementById("add-task-btn");
// const span = document.getElementsByClassName('close')[0];
const form = document.getElementById("task-form");

// btn.onclick = () => {
//   modal.style.display = "block";
// };
// span.onclick = () => {
//   modal.style.display = ''
// }
// window.onclick = (event) => {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

function handleAddTask(event) {
  event.preventDefault();
  const title = $("#task-name-input").val();
  const description = $("#task-description").val();
  const deadline = $("#due-date-input").val();
  const newTask = {
    id: generateTaskId(),
    name: title,
    description: description,
    deadline: deadline,
  };
  taskList.push(newTask);
  renderTaskList();
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(event.target).closest(".task-card").attr("id").split("-")[1];
  taskList = taskList.filter((task) => task.id !== parseInt(taskId));
  renderTaskList();
  console.log(`Task ${taskId} deleted. Updated tasks:`, taskList);
}

// Todo: create a function to handle dropping a task into a new status lane
let statusLanes = {
  todo: [],
  inProgress: [],
  done: [],
};
function handleDrop(event, ui) {
  const taskId = ui.draggable.data(createTaskCard);
  const newStatus = $(event.target).data("status");
  const currentStatus = getStatusLane(taskId);
  if (currentStatus) {
    const taskIndex = currentStatus.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      const [task] = currentStatus.splice(taskIndex, 1);
      task.status = newStatus;
      statusLanes[newStatus].push(task);
      updateUI(taskId, newStatus);
      console.log(
        `Task ${taskId} moved to ${newStatus} lane. Update status lanes:`,
        statusLanes
      );
    } handleDrop(newStatus);
  }
}
function getStatusLane(taskId) {
  for (const [status, tasks] of Object.entries(statusLanes)) {
    if (tasks.some((task) => task.id === taskId)) {
      return tasks;
    }
  }
  return null;
}
function makeLanesDroppable(statusLanes) {
  $(statusLanes).droppable({
    accept: ".task-card",
    drop: function(event, ui) {
      event.preventDefault();
      const card = ui.draggable.clone();
      $(this).append(card);
      ui.helper.remove();
    }
  });
}
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  makeLanesDroppable();
  // MakeDueDatePicker();
  $("#add-task-btn").on("click", function () {
    $("myModal").css("display", "block");
  });
  modalAddTaskBtn.addEventListener("click", handleAddTask);
});
