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
    elementTitle.textContent = title;
    const elementDescription = document.createElement("p");
    elementDescription.textContent = description;
    const elementDeadline = document.createElement("p");
    elementDeadline.textContent = `Deadline: ${deadline}`;
    card.addEventListener('click', () => {
      card.remove();
    });

  // Make the card draggable
  card.draggable({
    revert: "invalid",
    helper: "clone",
  });

  return card;
}

function saveTasksToStorage(taskList) {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// Todo: create a function to render the task list and make cards draggable

function renderTaskList() {
  for (const task of taskList) {
    renderTaskList(task);
  }
}
$(document).ready(function () {
  renderTaskList();
});
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
const modal = document.getElementById("myModal");
const btn = document.getElementById("add-task-btn");
// const span = document.getElementsByClassName('close')[0];
const form = document.getElementById("task-form");

btn.onclick = () => {
  modal.style.display = "block";
};
// span.onclick = () => {
//   modal.style.display = ''
// }
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
$(document).ready(function () {
  $("#task-form").submit(function (event) {
    event.preventDefault();
  });
});
function handleAddTask(event) {
  const title = $("#task-title").val();
  const description = $("#task-description").val();
  const deadline = $("#task-deadline").val();
  const newTask = {
    id: generateTaskId(),
    name: title,
    description: description,
    deadline: deadline,
  };
  taskList.push(newTask);
  renderTaskList();
}
function generateTaskId() {
  return "task-" + new Date().getTime();
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
  const taskId = ui.draggable.data("task-card");
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
    }
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

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  createTaskCard();
  makeLanesDroppable();
  MakeDueDatePicker();
  $("#add-task-btn").on("click", function () {
    $("myModal").css("display", "block");
  });
});
//   $('task-form').submit(handleAddTask);
//   $(document).on('click', 'delete', handleDeleteTask);
//   function renderTaskList() {
//     const taskContainer = $('#task-list');
//     taskContainer.empty();
//     taskList.forEach(task => {
//       const taskCard = createTaskCard(task.title, task.description, task.deadline);
//       taskContainer.append(taskCard);
//     });
//   }
//   // function handleDrop(event, ui) {
//   //   const taskId = ui.draggable.date('task-id');
//   //   const newStatus = $(event.target).data('status');
//   // }
// });
