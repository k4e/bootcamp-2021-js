
const myEscape = (s) => s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const createTodoItem = (id, name, done) => {
  const li = document.createElement('li');
  li.setAttribute('class', 'todos__wrapper');
  const label = document.createElement();
  label.setAttribute('class', 'todo-toggle__container');
  const input = document.createElement('input');
  input.setAttribute('data-todo-id', id);
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'todo-toggle');
  input.checked = done;
  const span = document.createElement('todo-toggle__checkmark');
  label.appendChild(input);
  label.appendChild(span);
  const divName = document.createElement('div');
  divName.setAttribute('class', 'todo-name');
  divName.innerText = myEscape(name);
  const divRemoveButton = document.createElement('div');
  divRemoveButton.setAttribute('data-todo-id', String(id));
  divRemoveButton.setAttribute('class', 'todo-remove-button');
  divRemoveButton.innerText = 'x';
  li.appendChild(input);
  li.appendChild(divName);
  li.appendChild(divRemoveButton);
  return li;
};

export const refreshList = (requestMethod) => {
  const todosDiv = document.getElementsByClassName('todos__wrapper')[0];
  const todosUL = todosDiv.getElementsByClassName('todos')[0];
  requestMethod(
    (todoList) => {
      while (todosUL.firstChild) {
        todosUL.removeChild(todosUL.firstChild);
      }
      for (let i = 0; i < todoList.length; ++i) {
        const todo = todoList[i];
        const id = todo.id;
        const name = todo.name;
        const done = todo.done;
        const todoItem = createTodoItem(id, name, done);
        todosUL.appendChild(todoItem);
      }
    }
  );
};
