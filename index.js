let interval;
const timerText = document.querySelector('.show_timer-left');
const endTimer = document.querySelector('.show_timer-end');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(interval);
  const time = Date.now();
  const endTime = time + seconds * 1000;

  showTimer(seconds);
  showEndTime(endTime);

  interval = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(interval);
      return;
    }
    showTimer(secondsLeft);
  }, 1000);
}

function showTimer(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60);
  const second = seconds % 60;
  const show = `${hours === 0 ? '' : hours + ':'}${
    minutes % 60 < 10 && minutes % 60 !== 0 ? '0' : '' // добавление 0, если минут меньше 10
  }${minutes % 60 !== 0 ? minutes % 60 : '00'}:${second < 10 ? '0' + second : second}`; // общий вывод минут

  timerText.textContent = show;
  document.title = show;
}

function showEndTime(time) {
  const end = new Date(time);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const show = `Вернуться к работе в ${hour}:${minutes < 10 ? '0' + minutes : minutes}`;

  endTimer.textContent = show;
}

function pushTimer() {
  const seconds = this.dataset.time;
  timer(seconds);
}

buttons.forEach((button) => {
  button.addEventListener('click', pushTimer);
});

document.timerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const minutes = this.minutes.value * 60;
  timer(minutes);
  this.reset();
});
