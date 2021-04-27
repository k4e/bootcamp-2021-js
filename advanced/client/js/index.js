
import * as Views from './views.js';
import * as Logic from './logic.js';

const main = () => {
  // console.log("ここにロジックを記述");
  window.addEventListener('DOMContentLoaded', () => {
    Views.refreshList(Logic.sendGetRequest);
    Views.onLoad(Logic.sendGetRequest, Logic.sendPostRequest)
  });
};

main();
