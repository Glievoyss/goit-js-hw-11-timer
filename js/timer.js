"use strict";

// Класс конструктор для таймера по айдишнику
class CountdownTimer {
  constructor({ selector, targetDate }) {

    // выбираю DIV с таймером по id
    this.htmlTimer = document.querySelector(selector);
    
    // выбираю в выбраном ДИВ поля с днями, часами, минутами и сикундами
    this.refs = {
      htmlDays: this.htmlTimer.querySelector('[data-value=days]'),
      htmlHours: this.htmlTimer.querySelector('[data-value=hours]'),
      htmlMins: this.htmlTimer.querySelector('[data-value=mins]'),
      htmlSecs: this.htmlTimer.querySelector('[data-value=secs]'),
    }
        
    // принимаю дату указанную пользователем
    this.targetDate = targetDate;
    // запускаю метот который выщитывает оставшееся время и ссылаеться на метод вывода времени в хтмл
    this.reversClock();
  }

  // метод вычесления даты
  reversClock() {
    // создаю сетИнтервал который будет высчитывать каждые 1000мс и выводить оставшееся время в хтмл
    const intervalId = setInterval(() => {

      // оставшееся время = время указанное пользователем минус настоящее текущее время
      let time = this.targetDate - Date.now();

      // проверяю что бы оставшееся время не было минусовым и если это так, то останавливаю 
      // таймер и удаляю данный сетИнтервал (что бы не крутился лишний раз в оперативке)
      if (time <= 0) {
        clearInterval(this.timerID);
        return;
      }
      // выщитываю оставшиеся Д-Ч-М-С, перевожу в строку и добавляю падСтартом нолики если это требуется
      // дни
      const days = String(Math.floor(time / (1000 * 60 * 60 * 24))).padStart(3, '0');
      // часы
      const hours = String(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      // минуты
      const mins = String(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      // секунды
      const secs = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2, '0');
      
      // передаю эти аргументы в метод который выводит данные в HTML
      this.insertInHtml(days,hours,mins,secs);
    }, 1000);
    
  }

  insertInHtml (days,hours,mins,secs){
    // вывожу в окно браузера в заранее выбранные элементы ДОМа выщетанные данные  
    this.refs.htmlDays.textContent = days;
    this.refs.htmlHours.textContent = hours;
    this.refs.htmlMins.textContent = mins;
    this.refs.htmlSecs.textContent = secs;
  }
}


// Создаю таймер по айдишнику тимер-1
new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 30, 2020")
});







