// ########## Create references ########## //

const form = document.querySelector(".add-todo");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");

// ########## Event Listeners ########## //

form.addEventListener("submit", handleOnSubmit);
todoList.addEventListener("click", handleOnClick);

// ########## Application code ########## //

createDummyTodos();

// ########## Functions ########## //

/**
 * The handler to the submit event.
 * @param {*} event
 */
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
            <input class="todo-input" type="checkbox">
            <label class="todo-label">${newTodo}</label>
            <span class="material-symbols-outlined delete">
                delete
            </span>
        </article>
     `;

  return newTodoElementString;
}

/**
 * Will add the provided todoElementString to the DOM, specifically to the todoListElement.
 * @param {*} todoElementString
 */
function addNewTodoToTodoList(todoElementString) {
  todoList.insertAdjacentHTML("beforeend", todoElementString);
}

/**
 * Click handler for clicking on a todo.
 * @param {*} event
 * @returns
 */
function handleOnClick(event) {
  const target = event.target;
  const classList = target.classList;

  if (classList.contains("delete")) {
    const todoElement = target.parentElement;
    removeTodo(todoElement);
    return;
  }

  markTodoAsDone(target);
}

/**
 * Removes a todo from the todo list
 * @param {*} todoToRemove
 */
function removeTodo(todoToRemove) {
  todoList.removeChild(todoToRemove);
}

/**
 * Marks a todo as done or not done
 * @param {*} target
 */
function markTodoAsDone(target) {
  let article;

  if (target.tagName !== "ARTICLE") {
    article = target.parentElement;
  } else {
    article = target;
  }

  const checkbox = article.querySelector(".todo-input");
  const label = article.querySelector(".todo-label");

  if (target.tagName !== "INPUT") {
    checkbox.checked = !checkbox.checked;
  }

  if (checkbox.checked) {
    label.classList.add("done");
  } else {
    label.classList.remove("done");
  }
}

async function createDummyTodos() {
  const results = await fetch("./dummyData.json");
  const dummyData = await results.json();

  // Google async/await in JS to read more

  let dummyDataString = "";

  for (const data of dummyData) {
    const todoElementString = createTodoElement(data.todo);
    dummyDataString += todoElementString;
    // dummyDataString = dummyDataString + todoElementString // Equal to above
  }

  addNewTodoToTodoList(dummyDataString);
}
