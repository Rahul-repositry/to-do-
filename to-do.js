///Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

///Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
//Function

function addTodo(event) {
  //Prevent form from submitting

  event.preventDefault(); //agr ye default behviour action rokta hai toh isne click kyun nhi roka?????????????

  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Add todo to LocalStorage
  saveLocaalTodos(todoInput.value);

  //Clear Todo Input value
  todoInput.value = "";

  //Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML =
    '<i class="fa-solid fa-calendar-check"  style="padding:1em"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Check trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML =
    '<i class="fa-solid fa-trash" style="padding:1em"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to List

  todoList.appendChild(todoDiv);
}

function deleteCheck(e) {
  e.stopPropagation();
  const item = e.target;
  //Delete Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //removelocaltodo
    removeLocalTodos(todo);

    //Animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check Mark
  console.log(item.classList[0], "this");

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

const options = document.querySelectorAll("option");
options.forEach(function () {
  addEventListener("click", (e) => {
    console.log(e.target);
  });
});

function filterTodo(e) {
  console.log(e.target);
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (
      e.target.value ///maine class de hai but value ye kaha se  uthaiga aur is hisab se to mere pass all ki koi class hi nahi hai..???????
    ) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocaalTodos(todo) {
  //check--Hey Do i already have thing in there?

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-calendar-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to List

    todoList.appendChild(todoDiv);
  });
} //ye sara code kaha apply ho rha hai?????

function removeLocalTodos(todo) {
  //check

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  console.log(todo.children);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
