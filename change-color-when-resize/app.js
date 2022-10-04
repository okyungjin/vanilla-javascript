const body = document.querySelector('body');
const handleWindowResize = (event) => {
  const currentScreenWidth = event.target.innerWidth;
  if (currentScreenWidth > 1200) {
    body.classList.remove('medium');
    body.classList.add('large');
  } else {
    if (currentScreenWidth > 500) {
      body.classList.remove('small', 'large');
      body.classList.add('medium');
    } else {
      body.classList.remove('medium');
      body.classList.add('small');
    }
  }
};

window.addEventListener('resize', handleWindowResize);
