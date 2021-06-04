// Просто закинуть const в класс нельзя
// Err: The 'const' modifier can only be used in TypeScript files.ts(8009)
// const refs = {
//   days: document.querySelector('[data-value="days"]'),
//   hours: document.querySelector('[data-value="hours"]'),
//   mins: document.querySelector('[data-value="mins"]'),
//   secs: document.querySelector('[data-value="secs"]'),
// };
class CountdownTimer {
  constructor ({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.getTimerCountdown();
  }

  getTimerCountdown () {
    setInterval(() => {
      const deltaTime = this.targetDate - Date.now();
      const timerCountdown = this.getTimeComponents(deltaTime);

      this.updateTimer(timerCountdown);
    }, 1000);
  }

  updateTimer ({ days, hours, mins, secs }) {
    (this.selector.querySelector('[data-value="days"]').textContent = `${days}`),
      (this.selector.querySelector('[data-value="hours"]').textContent = `${hours}`),
      (this.selector.querySelector('[data-value="mins"]').textContent = `${mins}`),
      (this.selector.querySelector('[data-value="secs"]').textContent = `${secs}`);
    // (refs.days.textContent = `${days}`),
    // (refs.hours.textContent = `${hours}`),
    // (refs.mins.textContent = `${mins}`),
    // (refs.secs.textContent = `${secs}`);
  }

  getTimeComponents (time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad (value) {
    return String(value).padStart(2, '0');
  }
}

new CountdownTimer({
  // selector: '#timer-1',
  selector: document.querySelector('#timer-1'),
  targetDate: new Date('Feb 02, 2022'),
});

new CountdownTimer({
  selector: document.querySelector('#timer-2'),
  targetDate: new Date('Apr 02, 2040'),
});

/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);
