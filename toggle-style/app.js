const handleTitleClick = () => {
  const activeClass = 'active';
  h1.classList.toggle(activeClass);

  /* 다음 코드와 동일하게 동작한다.
  if (h1.classList.contains(activeClass)) {
    h1.classList.remove(activeClass);
  } else {
    h1.classList.add(activeClass);
  }
  */
};

const h1 = document.querySelector('h1');
h1.addEventListener('click', handleTitleClick);