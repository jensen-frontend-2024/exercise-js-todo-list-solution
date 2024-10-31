// ########## Create references ########## //

const form = document.querySelector(".form");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const authorSelect = document.querySelector(".author-select");

// ########## Event Listeners ########## //

form.addEventListener("submit", handleOnSubmit);
todoList.addEventListener("click", handleOnClick);

// ########## Application code ########## //

const dummyTodos = [
  { author: "Niklas", timestamp: new Date("2024-12-29"), content: "Cook food" },
  { author: "Maria", timestamp: new Date("2024-12-28"), content: "Buy candy" },
  {
    author: "Niklas",
    timestamp: new Date("2024-12-31"),
    content: "Clean room",
  },
];

const dummyAuthors = ["Niklas", "Maria", "Elsa", "Esther", "Edith"];

createDummyTodos(dummyTodos);
createDummyAuthors(dummyAuthors);

// ########## Functions ########## //

function addNewTodoToTodoList(todoElementString) {
  todoList.insertAdjacentHTML("beforeend", todoElementString);
}

function createDummyAuthors(dummyAuthors) {
  let dummyAuthorsHTML = "";

  for (const author of dummyAuthors) {
    const authorOptionHTML = `
      <option class="author">${author}</option>
    `;

    dummyAuthorsHTML += authorOptionHTML;
  }

  authorSelect.insertAdjacentHTML("afterbegin", dummyAuthorsHTML);
}

function createDummyTodos(dummyTodos) {
  let dummyDataString = "";

  for (const todo of dummyTodos) {
    const todoElementString = createTodoElement(todo);
    dummyDataString += todoElementString;
  }

  todoList.insertAdjacentHTML("afterbegin", dummyDataString);
}

function createTodoElement(todo) {
  return /*html*/ `
    <article class="todo">
      <div class="upper-todo">
        <div class="content">
          <input class="checkbox" type="checkbox">
          <label class="label">${todo.content}</label>
        </div>

        <div class="icons">
          <span class="delete icon material-symbols-outlined ">
              delete
          </span>
          <span class=" move-down icon material-symbols-outlined">
              arrow_downward
          </span>
          <span class=" move-up icon material-symbols-outlined">
              arrow_upward
          </span>
          <span class="edit icon material-symbols-outlined">
              edit
          </span>
        </div>
      </div>

      <div class="lower-todo">
        <span>${todo.author}</span>
        <span> • </span>
        <span>${todo.timestamp.toDateString()}</span>
      </div>   
    </article>
  `;
}

function editTodo(todoToEdit) {
  const todoEditForm = document.createElement("form");
  todoEditForm.innerHTML = `<input class="todo-edit-input" type="text">`;
  const label = todoToEdit.querySelector(".todo-label");
  let inputValue = "";

  todoEditForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const input = todoEditForm.firstElementChild; // The input field inside the form
    inputValue = input.value;

    todoToEdit.replaceChild(label, todoEditForm);
    label.innerText = inputValue;
  });

  todoToEdit.replaceChild(todoEditForm, label);
}

function handleOnClick(event) {
  const target = event.target;
  const targetParent = target.parentElement;
  const targetClassList = target.classList;

  if (targetClassList.contains("delete")) {
    removeTodo(targetParent);
    return;
  } else if (targetClassList.contains("move-up")) {
    moveTodo("up", targetParent);
    return;
  } else if (targetClassList.contains("move-down")) {
    moveTodo("down", targetParent);
    return;
  } else if (targetClassList.contains("edit")) {
    editTodo(targetParent);
    return;
  } else {
    markTodoAsDone(target);
  }
}

function handleOnSubmit(event) {
  event.preventDefault();

  const newTodo = todoInput.value;
  const newTodoElementString = createTodoElement(newTodo);
  addNewTodoToTodoList(newTodoElementString);
  todoInput.value = "";
}

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

function moveTodo(direction, todoToMove) {
  if (direction === "up") {
    const previousElementSibling = todoToMove.previousElementSibling;

    if (previousElementSibling !== null) {
      todoList.insertBefore(todoToMove, previousElementSibling);
    }
  }

  if (direction === "down") {
    const nextElementSibling = todoToMove.nextElementSibling;

    if (nextElementSibling !== null) {
      todoList.insertBefore(nextElementSibling, todoToMove);
    }
  }
}

function removeTodo(todoToRemove) {
  todoList.removeChild(todoToRemove);
}
