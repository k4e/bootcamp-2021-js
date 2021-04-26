
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
        console.log(`Error on GET /: ${httpRequest.status} ${httpRequest.statusText}`);
      }
    }
  };
  httpRequest.open('GET', 'http://localhost:3000/todo');
  httpRequest.send();
};
