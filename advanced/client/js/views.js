
export const myEscape = (s) => s ? s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;') : '';

export const createTodoItem = (id, name, done) => {
  const li = document.createElement('li');
  li.setAttribute('class', 'todo-item');
  const label = document.createElement('label');
  label.setAttribute('class', 'todo-toggle__container');
  const input = document.createElement('input');
  input.setAttribute('data-todo-id', id);
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'todo-toggle');
  input.checked = (done ? 'checked' : null);
  const span = document.createElement('span');
  span.setAttribute('class', 'todo-toggle__checkmark');
  label.appendChild(input);
  label.appendChild(span);
  const divName = document.createElement('div');
  divName.setAttribute('class', 'todo-name');
  divName.innerHTML = myEscape(name);
  const divRemoveButton = document.createElement('div');
  divRemoveButton.setAttribute('data-todo-id', String(id));
  divRemoveButton.setAttribute('class', 'todo-remove-button');
  divRemoveButton.innerText = 'x';
  li.appendChild(label);
  li.appendChild(divName);
  li.appendChild(divRemoveButton);
  return li;
};

export const refreshList = (requestFn) => {
  const todosDiv = document.getElementsByClassName('todos__wrapper')[0];
  const todosUL = todosDiv.getElementsByClassName('todos')[0];
  requestFn(
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

export const onSubmit = (requestFn) => {
  const todosDiv = document.getElementsByClassName('todos__wrapper')[0];
  const todosUL = todosDiv.getElementsByClassName('todos')[0];
  const textInput = document.getElementsByClassName('todo-form__input')[0];
  const name = textInput.value;
  requestFn(
    name,
    (todo) => {
      const id = todo.id;
      const name = todo.name;
      const done = todo.done;
      const todoItem = createTodoItem(id, name, done);
      todosUL.appendChild(todoItem);
    }
  )
};

export const onLoad = (sendGetRequest, sendPostRequest) => {
  const button = document.getElementsByClassName('todo-form__submit')[0];
  button.addEventListener('click', (e) => {
    e.preventDefault();
    onSubmit(sendPostRequest);
  });
}
