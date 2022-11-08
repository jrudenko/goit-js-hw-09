import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Ищим селектор формы
const refs = {
  form: document.querySelector('.form'),
};
// Ставим слушателя на сабмит
refs.form.addEventListener('submit', onCreatePromises);

// Планируем промис
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// функция обработки данных
function onCreatePromises(e) {
  e.preventDefault(); // Блокируем перезагрузку

  const formData = new FormData(e.currentTarget); // Создаем объект с сылкой на эл, накотором произошло событие при всплыти
  const dataArgument = {};

  for (const [key, value] of formData.entries()) {
    dataArgument[key] = Number(value);
  } // Переберем и создадим пары значений и ключей

  let { amount, step, delay } = dataArgument; // создадим переменную-обьект с аргументами и запишем dataArgument

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onError); // вызов промиса и пристегиваем резулькат работы коллбеков
    delay += step;
    refs.form.reset(); // восстановим стандартные значения всем элементам формы
  }
}

//Функция ошибки
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

// функция успеха
function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
