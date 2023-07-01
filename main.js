let addTodoInput = document.getElementById("add-todo-input");
let serachTodoInput = document.getElementById("search-todo-input");
let currInputValue = "";
let todosContainer = document.getElementById("todos-container");
let trash = document.getElementById("deleteAllButton");
let serachInputValue = "";
let todoList = JSON.parse(localStorage.getItem("todos")) ?? [];
updateTodos();

function setTodosToStorage() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

addTodoInput.addEventListener("input", (event) => {
  currInputValue = event.target.value;
});

serachTodoInput.addEventListener("input", (event) => {
  serachInputValue = event.target.value;
  updateTodos();
});

function addTodo() {
  if (currInputValue.trim() !== "") {
    todoList.push({
      id: Date.now(),
      text: currInputValue,
      isCompleted: false,
    });
  }
  updateTodos();
  addTodoInput.value = "";
  currInputValue = "";
}

function updateTodos() {
  todosContainer.innerHTML = "";
  todoList
    .filter((todoEl) =>
      todoEl.text.toUpperCase().includes(serachInputValue.toUpperCase())
    )
    .forEach((todoEl) => {
      let divider = document.createElement("hr");
      divider.className = "divider";
      let todoCard = document.createElement("div");
      todoCard.className = "todo-card";
      todoCard.innerHTML = `<div class="${
        todoEl.isCompleted ? "checkbox checkbox-checked" : "checkbox"
      }" onclick="toggleCheck(${todoEl.id})">
        <i class="fa-solid fa-check"></i>
    </div>
    <p class="todo-text">${todoEl.text}</p>
    <i class="fa-solid fa-xmark" onclick="deleteTodo(${todoEl.id})"></i>`;
      todosContainer.appendChild(divider);
      todosContainer.appendChild(todoCard);
    });
  setTodosToStorage();
}

function toggleCheck(todoId) {
  todoList = todoList.map((todoEl) => {
    if (todoId === todoEl.id) {
      let newTodoEl = {
        text: todoEl.text,
        id: todoEl.id,
        isCompleted: !todoEl.isCompleted,
      };
      return newTodoEl;
    } else {
      return todoEl;
    }
  });
  updateTodos();
}

addTodoInput.addEventListener("keyup", (event) => {
  console.log(event);
  if (event.key == "Enter") {
    addTodo();
  }
});

function deleteTodo(todoId) {
  todoList = todoList.filter((todoEl) => !(todoEl.id === todoId));
  updateTodos();
}

trash.addEventListener("click", () => {
  todoList = [];
  updateTodos();
});
