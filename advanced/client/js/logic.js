
const URL = 'http://localhost:3000/todo';

export const sendGetRequest = (onSuccess) => {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        console.log(httpRequest.responseText);
        const respJson = JSON.parse(httpRequest.responseText);
        const todoList = respJson.todoList;
        // ID 順でソート
        todoList.sort((a, b) => {
          return a.id - b.id;
        });
        onSuccess(todoList);
      } else {
        console.error(`Error on GET /: ${httpRequest.status} ${httpRequest.statusText}`);
      }
    }
  };
  httpRequest.open('GET', URL);
  httpRequest.send();
};

export const sendPostRequest = (name, onSuccess) => {
  const reqData = {
    'name': name
  };
  console.log(name);
  const reqBody = JSON.stringify(reqData);
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (200 <= httpRequest.status && httpRequest.status < 300) {
        console.log(httpRequest.responseText);
        const todo = JSON.parse(httpRequest.responseText);
        onSuccess(todo);
      } else {
        console.error(`Error on POST /: ${httpRequest.status} ${httpRequest.statusText}`);
      }
    }
  };
  httpRequest.open('POST', URL);
  httpRequest.setRequestHeader('Content-Type', 'application/json')
  httpRequest.send(reqBody)
};
