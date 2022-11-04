import '../css/common.css';

let getEl = selector => document.querySelector(selector);
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

getEl('[data-start]').addEventListener('click', btnStart);
getEl('[data-stop]').addEventListener('click', btnStop);

function btnStart() {
  console.log('clickStart');
  getEl('[data-start]').setAttribute('disabled', true);
  getEl('[data-stop]').removeAttribute('disabled');

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function btnStop() {
  console.log('clickStop');
  getEl('[data-stop]').setAttribute('disabled', true);
  getEl('[data-start]').removeAttribute('disabled');

  clearInterval(timerId);
}
