# Input Values
- [selector 축약 문법](#selector-축약-문법)
- [`<form>` vs `<div>`](#form-vs-div)

<br>

## selector 축약 문법
`login-form` 내부의 `<input>`, `<button>` 를 가져올 때
```html
<div id="login-form">
  <input type="text" placeholder="What is your name?" />
  <button>Log In</button>
</div>
```
### verbose
```js
const loginForm = document.querySelector('#login-form');
const loginInput = loginForm.querySelector('input');
const loginButton = loginForm.querySelector('button');
```
### shorthand
```js
const loginInput = document.querySelector('#login-form input');
const loginButton = document.querySelector('#login-form button');
```

<br>

## `<form>` vs `<div>`
`<input>`에서 `required`, `maxlength` 와 같은 validation 속성을 사용할 수 있다. 단, 아래 코드에서는 동작하지 않는다.
```html
<div id="login-form">
  <input required maxlength="15" type="text" placeholder="What is your name?" />
  <button>Log In</button>
</div>
```
`<form>`이 아닌 `<div>`이기 때문이다.

또한, `<div>`로 입력 form을 구성할 경우 아래와 같이 `button`에 이벤트를 바인딩해주어야 한다. 
```js
const loginButton = document.querySelector('#login-form button');
const onLoginBtnClick = () => {
  const username = loginInput.value;
  // need validation (required, maxlength, ...)
}

loginButton.addEventListener('click', onLoginBtnClick);
```

반면 다음과 같이 `<form>`을 사용하면 브라우저로부터 `<input>`에 대한 validation 지원을 받을 수 있다.
```html
<form id="login-form">
  <input required maxlength="15" type="text" placeholder="What is your name?" />
  <input type="submit" value="Log In" />
</form>
```
