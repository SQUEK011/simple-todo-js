/*
    Select important elements
 */
const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");

// Trigger add button for additional task process
addButton.addEventListener("click", function () {
  let taskText = taskInput.value;

  // Add task if input is not empty
  if (taskText !== "") {
    // Create a new list item for the task
    const taskElement = document.createElement("li");

    // Create a span for the task text
    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = taskText;

    // Create "Complete" and "Delete" buttons
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("completeButton");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");

    // Attach buttons to the task element
    taskElement.appendChild(taskTextSpan);
    taskElement.appendChild(completeButton);
    taskElement.appendChild(deleteButton);

    // Add the task element to the task list
    taskList.appendChild(taskElement);

    // Update Storage
    updateLocalStorage();

    //Clear the input field
    taskInput.value = "";
  }
});

// Event delegation for "Complete" and "Delete" buttons
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("completeButton")) {
    const task = event.target.parentElement;
    task.classList.toggle("completed");
    updateLocalStorage(); // Update storage when task is marked as complete
  } else if (event.target.classList.contains("deleteButton")) {
    const task = event.target.parentElement;
    taskList.removeChild(task);
    updateLocalStorage(); // Update storage when task is deleted
  }
});

// DOMContentLoaded event for restoring tasks from localStorage
document.addEventListener("DOMContentLoaded", function () {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (taskText) {
      addTaskToList(taskText);
    });
  } catch (error) {
    console.error("Error parsing tasks from local storage:", error);
  }
});

function updateLocalStorage() {
  const tasks = [];
  const taskElements = document.querySelectorAll("li");

  taskElements.forEach(function (taskElement) {
    // Extract the task text from the li element and push it to tasks
    const taskText = taskElement.querySelector("span").textContent;
    tasks.push(taskText);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToList(taskText) {
  const taskElement = document.createElement("li");
  // Create a span for the task text
  const taskTextSpan = document.createElement("span");
  taskTextSpan.textContent = taskText;

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.classList.add("completeButton");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("deleteButton");

  taskElement.appendChild(taskTextSpan);
  taskElement.appendChild(completeButton);
  taskElement.appendChild(deleteButton);

  taskList.appendChild(taskElement);
}
