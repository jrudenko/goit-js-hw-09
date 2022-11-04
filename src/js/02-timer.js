import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_green.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let getEl = selector => document.querySelector(selector);

getEl('[data-start]').disabled = true;
let timerId = null;

// console.log(getEl('[data-start]'));

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      getEl('[data-start]').disabled = false;
    } else {
      getEl('[data-start]').disabled = true;
      Notify.failure('Please choose a date in the future', {
        timeout: 1500,
        width: '400px',
        borderRadius: '8px',
      });
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2);
}

function btnStart() {
  const selectedDate = fp.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = new Date();
    const countdown = selectedDate - startTime;
    getEl('[data-start]').disabled = true;

    if (countdown < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimer(convertMs(countdown));
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  getEl('[data-days]').textContent = addLeadingZero(days);
  getEl('[data-hours]').textContent = addLeadingZero(hours);
  getEl('[data-minutes]').textContent = addLeadingZero(minutes);
  getEl('[data-seconds]').textContent = addLeadingZero(seconds);
}

getEl('[data-start]').addEventListener('click', btnStart);

const fp = flatpickr('#datetime-picker', options);
