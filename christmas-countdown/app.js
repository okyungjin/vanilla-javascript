const countdown = document.querySelector('.christmas-countdown');

const isTodayAfterChristmas = (today) => {
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return month === 12 && day >= 25;
};

const getRemainingDateUntilChristmas = () => {
  const today = new Date();
  const year = today.getFullYear();
  const ChristmasYear = isTodayAfterChristmas(today) ? year + 1 : year;
  const ChristmasDate = new Date(ChristmasYear, 11, 25);

  const diffOnMilliSecond = ChristmasDate - today;
  const day = Math.floor(diffOnMilliSecond / 1000 / 60 / 60 / 24);
  const hour = String(Math.floor(diffOnMilliSecond / 1000 / 60 / 60) % 24).padStart(2, '0');
  const minute = String(Math.floor((diffOnMilliSecond / 1000 / 60) % 60)).padStart(2, '0');
  const second = String(Math.floor((diffOnMilliSecond / 1000) % 60)).padStart(2, '0');

  countdown.innerText = `${day}d ${hour}h ${minute}m ${second}s`;
};

getRemainingDateUntilChristmas();
setInterval(getRemainingDateUntilChristmas, 1000);
