const $daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const $monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const $years = ['2020', '2021', '2022', '2023', '2024']

let $today = new Date();
let $firstDayOfMonth = new Date($today.getUTCFullYear(), $today.getMonth(), 1)
let $lastDayOfMonth = new Date($today.getUTCFullYear(), $monthsNames.indexOf($today.getMonth()) + 1, 0)
let $dateObject = {
    day: $today.getDay(),
    date: $today.getDate(),
    month: $monthsNames[$today.getMonth()],
    year: $today.getUTCFullYear(),
    firstDayOfMonth: $firstDayOfMonth.getDay(),
    lastDayOfMonth: $lastDayOfMonth.getDate()
};


Vue.component('date', {
    props: ['i', 'today', 'dateobject', 'event', 'index'],
    template: `
     <div class="card date px-2 py-1">
                        <p :style = "{visibility: i > dateobject.firstDayOfMonth && i <= dateobject.lastDayOfMonth ? 'visible' : 'hidden'}" >
                        <span :class = "i - dateobject.firstDayOfMonth == today.date && 
                        dateobject.month == today.month &&
                            dateobject.year == today.year ? 'today-date' : ''">
                            {{i - dateobject.firstDayOfMonth}}
                            </span>
                            </p>
                        <div class="d-flex justify-content-between">
                            <span class="mr-1"></span>
                            <span class="time"></span>
                        </div>

                    </div>
    `
})

const app = new Vue({
    el: '#app',
    data: {
        today: $dateObject,
        daysNames: $daysNames,
        months: $monthsNames,
        years: $years,
        dateObject: {},
        events: [],
    },

    mounted() {
        console.log($dateObject)
        if (localStorage.getItem('today')) {
            this.dateObject = JSON.parse(localStorage.getItem('today'));
        } else {
            this.dateObject = $dateObject;
        }
    },

    methods: {
        updateMonth: function (e) {
            this.dateObject.month = e.target.value;
            let firstDayDate = new Date();
            let lastDayDate = new Date();
            firstDayDate.setFullYear(this.dateObject.year, this.months.indexOf(this.dateObject.month), 1);
            lastDayDate.setFullYear(this.dateObject.year, this.months.indexOf(this.dateObject.month) + 1, 0);
            this.dateObject.firstDayOfMonth = firstDayDate.getDay();
            this.dateObject.lastDayOfMonth = lastDayDate.getDate();
            localStorage.setItem('today', JSON.stringify(this.dateObject));

        },
        updateYear: function (e) {
            this.dateObject.year = e.target.value;
            let firstDayDate = new Date();
            let lastDayDate = new Date();
            firstDayDate.setFullYear(this.dateObject.year, this.months.indexOf(this.dateObject.month), 1);
            lastDayDate.setFullYear(this.dateObject.year, this.months.indexOf(this.dateObject.month) + 1, 0);
            this.dateObject.firstDayOfMonth = firstDayDate.getDay();
            this.dateObject.lastDayOfMonth = lastDayDate.getDate();
            localStorage.setItem('today', JSON.stringify(this.dateObject));
        },
        addEvent: function (date, i) {
            let index = date.year + date.month + (i - date.firstDayOfMonth);
            this.events[index] = {
                time: index,
                title: "title" + index,
                desc: "desc" + index
            };
            console.log(this.events)
        }
    }
})