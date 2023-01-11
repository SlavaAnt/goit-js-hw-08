import throttle from 'lodash.throttle';
// const throttle = require('lodash.throttle');
// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);

refs.form.addEventListener('input', throttle(onInputOrTextarea, 500));

const data = {
  email: '',
  message: '',
};

function onFormSubmit(evt) {
  evt.preventDefault();

  let formData = new FormData(evt.target);
  formData.forEach((name, value) => {
    data[name] = value;
  });
  console.log(data);

  evt.target.reset();
  localStorage.removeItem('feedback-form-state');
}

function onInputOrTextarea(evt) {
  const name = evt.target.name;
  const value = evt.target.value;
  data[name] = value;
  setData(data);
}

function setData(data) {
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

dataOutputAfterReboot();
checkOfEnteredData();

function checkOfEnteredData() {
  if (refs.input.value) {
    data.email = refs.input.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(data));
  }
  if (refs.textarea.value) {
    data.message = refs.textarea.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(data));
  }
}

function dataOutputAfterReboot() {
  const saveData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (saveData) {
    refs.input.value = saveData.email;
    refs.textarea.value = saveData.message;
    return saveData;
  }
}
