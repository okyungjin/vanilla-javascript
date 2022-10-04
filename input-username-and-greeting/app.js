/** verbose
 const loginForm = document.querySelector('#login-form');
 const loginInput = loginForm.querySelector('input');
 const loginButton = loginForm.querySelector('button');
 */

// shorthand
const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

const onLoginSubmit = (event) => {
  event.preventDefault(); // prevent submitting form
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  hideInputForm();
  showGreetings(username);
};

const hideInputForm = () => {
  loginForm.classList.add(HIDDEN_CLASSNAME);
};

const showGreetings = (username) => {
  greeting.innerText = `Hello, ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
};

const storedUsername = localStorage.getItem(USERNAME_KEY);
if (storedUsername) {
  hideInputForm();
  showGreetings(storedUsername);
}

loginForm.addEventListener('submit', onLoginSubmit);
