// ########## Create references ########## //

const form = document.querySelector(".add-todo");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");

// ########## Event Listeners ########## //

form.addEventListener("submit", handleOnSubmit);

// ########## Functions ########## //

function handleOnSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  console.log("New todo:", newTodo);
}
