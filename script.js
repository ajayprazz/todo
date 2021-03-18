const addBtn = document.getElementById("add-btn");

const todoInput = document.querySelector("input[name='todoItem']");

addBtn.addEventListener("click", () => {
  const newItem = document.querySelector("input[name='todoItem']").value;
  let todoList = localStorage.getItem("todos");
  todoList = todoList ? [...JSON.parse(todoList)] : [];
  todoList.push(newItem);
  localStorage.setItem("todos", JSON.stringify(todoList));
  todoInput.value = "";
  renderTodos();
});

const todosUl = document.getElementById("todo-results");

const renderTodos = () => {
  todosUl.innerHTML = "";
  let todos = localStorage.getItem("todos");
  if (todos) {
    todos = JSON.parse(todos);
    todos.forEach(todo => {
      const liItem = document.createElement("li");

      const todoText = document.createElement("span");
      todoText.innerHTML = todo;

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";

      const editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";

      liItem.appendChild(todoText);
      liItem.appendChild(editBtn);
      liItem.appendChild(deleteBtn);
      todosUl.appendChild(liItem);

      editBtn.addEventListener("click", e => {
        let todos = JSON.parse(localStorage.getItem("todos"));

        const todoText = e.target.parentNode.querySelector("span").innerHTML;

        const indexToEdit = todos.indexOf(todoText);

        const editedTodo = window.prompt("Edit Todo", todoText);
        if (editedTodo) {
          todos.splice(indexToEdit, 1, editedTodo);

          localStorage.setItem("todos", JSON.stringify(todos));
          renderTodos();
        }
      });

      deleteBtn.addEventListener("click", e => {
        let todos = JSON.parse(localStorage.getItem("todos"));
        const todoText = e.target.parentNode.querySelector("span").innerHTML;

        const indexToDelete = todos.indexOf(todoText);

        todos.splice(indexToDelete, 1);

        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      });
    });
  }
};

renderTodos();
