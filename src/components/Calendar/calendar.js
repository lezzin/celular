const monthText = document.querySelector("#month__name"),
    daysList = document.querySelector("#calendar__days"),
    prevMonthBtn = document.querySelector("#prev__month"),
    nextMonthBtn = document.querySelector("#next__month");

let date = new Date(),
    month = date.getMonth(),
    year = date.getFullYear(),
    monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


class Calendar {
    constructor(month, year) {
        this.month = month;
        this.year = year;
    }

    getFirstDay() {
        return new Date(this.year, this.month, 1).getDay();
    }

    getLastDay() {
        return new Date(this.year, this.month + 1, 0).getDate();
    }

    getLastDayPrevMonth() {
        return new Date(this.year, this.month, 0).getDate();
    }

    getMonthName() {
        return monthNames[this.month];
    }

    getNextMonth() {
        return this.month === 11 ? 0 : this.month + 1;
    }

    getPrevMonth() {
        return this.month === 0 ? 11 : this.month - 1;
    }

    getNextYear() {
        return this.month === 11 ? this.year + 1 : this.year;
    }

    getPrevYear() {
        return this.month === 0 ? this.year - 1 : this.year;
    }

    createCalendar() {
        let firstDay = this.getFirstDay(),
            lastDay = this.getLastDay(),
            lastDayPrevMonth = this.getLastDayPrevMonth(),
            monthName = this.getMonthName(),
            nextMonth = this.getNextMonth(),
            prevMonth = this.getPrevMonth(),
            nextYear = this.getNextYear(),
            prevYear = this.getPrevYear();

        let html = "";

        monthText.innerHTML = monthName;

        for (let i = firstDay; i > 0; i--) {
            html += `<li class="calendar__day   calendar__day--prev">${lastDayPrevMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDay; i++) {
            html += `<li class='calendar__day'>${i}</li>`;
        }

        for (let i = 1; html.split("calendar__day").length - 1 <= 42; i++) {
            html += `<li class="calendar__day calendar__day--next">${i}</li>`;
        }

        daysList.innerHTML = html;

        document.querySelectorAll(".calendar__day")[firstDay + new Date().getDate() - 1].classList.add("calendar__day--today");
        prevMonthBtn.addEventListener("click", () => {
            calendar = new Calendar(prevMonth, prevYear);
            calendar.createCalendar();
        });

        nextMonthBtn.addEventListener("click", () => {
            calendar = new Calendar(nextMonth, nextYear);
            calendar.createCalendar();
        });
        
        // eventos touchstart
        prevMonthBtn.addEventListener("touchstart", e => {
            e.preventDefault();
            calendar = new Calendar(prevMonth, prevYear);
            calendar.createCalendar();
        });

        nextMonthBtn.addEventListener("touchstart", e => {
            e.preventDefault();
            calendar = new Calendar(nextMonth, nextYear);
            calendar.createCalendar();
        });
    }
}

let calendar = new Calendar(month, year);
calendar.createCalendar();