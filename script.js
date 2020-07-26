const $daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const $monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const $years = ['2020', '2021', '2022', '2023', '2024']

let $today = new Date();
let $firstDayOfMonth = new Date($today.getUTCFullYear(), $today.getMonth(), 1)
let $lastDayOfMonth = new Date($today.getUTCFullYear(), $monthsNames.indexOf($today.getMonth()) + 1, 0)
let $todayOb = {
    day: $today.getDay(),
    date: $today.getDate(),
    month: $monthsNames[$today.getMonth()],
    year: $today.getUTCFullYear(),
    firstDayOfMonth: $firstDayOfMonth.getDay(),
    lastDayOfMonth: $lastDayOfMonth.getDate()
};


Vue.component('date', {
    props: ['day', 'event', 'time', 'firstday', 'lastday', 'i'],
    template: `
     <div class="card date px-2 py-1">
                        <p :style="{visibility: i > firstday && i <= lastday ? 'visible' : 'hidden'}">{{ day }}</p>
                        <div class="d-flex justify-content-between">
                            <span class="mr-1">{{ event }}</span>
                            <span class="">{{ time }}</span>
                        </div>

                    </div>
    `
})
const app = new Vue({
    el: '#app',
    data: {
        daysNames: $daysNames,
        months: $monthsNames,
        years: $years,
        selectedDay: {},
        dates: [{}],
    },

    mounted() {
        console.log($todayOb)
        if (localStorage.getItem('today')) {
            this.selectedDay = JSON.parse(localStorage.getItem('today'));
        } else {
            this.selectedDay = $todayOb;
        }
    },

    methods: {
        updateMonth: function (e) {
            this.selectedDay.month = e.target.value;
            let firstDayDate = new Date();
            let lastDayDate = new Date();
            firstDayDate.setFullYear(this.selectedDay.year, this.months.indexOf(this.selectedDay.month), 1);
            lastDayDate.setFullYear(this.selectedDay.year, this.months.indexOf(this.selectedDay.month) + 1, 0);
            this.selectedDay.firstDayOfMonth = firstDayDate.getDay();
            this.selectedDay.lastDayOfMonth = lastDayDate.getDate();
            localStorage.setItem('today', JSON.stringify(this.selectedDay));

        },
        updateYear: function (e) {
            this.selectedDay.year = e.target.value;
            let firstDayDate = new Date();
            let lastDayDate = new Date();
            firstDayDate.setFullYear(this.selectedDay.year, this.months.indexOf(this.selectedDay.month), 1);
            lastDayDate.setFullYear(this.selectedDay.year, this.months.indexOf(this.selectedDay.month) + 1, 0);
            this.selectedDay.firstDayOfMonth = firstDayDate.getDay();
            this.selectedDay.lastDayOfMonth = lastDayDate.getDate();
            localStorage.setItem('today', JSON.stringify(this.selectedDay));
        }
    }
})