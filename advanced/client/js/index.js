
import * as Views from './views.js';
import * as Logic from './logic.js';

const main = () => {
  // console.log("ここにロジックを記述");
  Views.refreshList(Logic.sendGetRequest);
  window.addEventListener('load', () => { Views.onLoad(Logic.sendGetRequest)} );
};

main();
