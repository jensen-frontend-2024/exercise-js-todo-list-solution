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
  const newTodoElementString = createTodoElement(newTodo);
  addNewTodoToTodoList(newTodoElementString);
  todoInput.value = "";
}

/**
 * This function takes a string and returns a string representation of the todo element
 * @param {*} newTodo
 * @returns
 */
function createTodoElement(newTodo) {
  const newTodoElementString = /*html*/ `
        <article class="todo">
            <p>${newTodo}</p>
        </article>
     `;

  return newTodoElementString;
}

function addNewTodoToTodoList(todoElementString) {
  todoList.insertAdjacentHTML("beforeend", todoElementString);
}
