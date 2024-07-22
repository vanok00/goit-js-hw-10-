'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const formEl = document.querySelector('.form');
const choosenTimeOfDelay = formEl.elements.delay;
const selectedValue = document.querySelectorAll('input[name="state"]');

formEl.addEventListener('submit', sendForm);
function sendForm(event) {
  event.preventDefault();
  const delay = choosenTimeOfDelay.value;
  const radioChecked = Array.from(selectedValue).find(
    element => element.checked
  );
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioChecked.value === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });

  promise
    .then(() => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: '#59a10d',
        position: 'topRight',
      });
    })
    .catch(() => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        color: '#ef4040',
        position: 'topRight',
      });
    });
}
