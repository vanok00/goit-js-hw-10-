'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//
const inputEl = document.getElementById('datetime-picker');
const button = document.querySelector('button');
button.setAttribute('disabled', '');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let intervalId = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0].getTime();
      toggleAttribute(button, false);
    } else {
      toggleAttribute(button, true);
      iziToast.show({
        title: '',
        color: 'red',
        position: 'topRight',
        timeout: 5000,
        close: false,
        closeOnClick: true,
        message: 'Please choose a date in the future',
        iconUrl: '../img/sprite.svg#close-btn',
        iconColor: '#FAFAFB',
      });
    }
  },
});

button.addEventListener('click', () => {
  if (userSelectedDate) {
    toggleAttribute(button, true);
    toggleAttribute(inputEl, true);
  }
  intervalId = setInterval(timer, 1000);
});

function timer() {
  const currentTime = Date.now();

  const choosenDayByUser = new Date(userSelectedDate).getTime();

  const difference = choosenDayByUser - currentTime;

  const { days, hours, minutes, seconds } = convertMs(difference);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
  if (difference <= 0) {
    clearInterval(intervalId);
    timerEnd();
    toggleAttribute(inputEl, false);
    toggleAttribute(button, true);
    return;
  }
}
function timerEnd() {
  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
}
function toggleAttribute(element, status) {
  if (status) {
    element.setAttribute('disabled', '');
  } else {
    element.removeAttribute('disabled');
  }
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
