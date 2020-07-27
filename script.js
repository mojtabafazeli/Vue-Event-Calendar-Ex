const $daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const $monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const $years = ['2020', '2021', '2022', '2023', '2024']

let $today = new Date();
let $firstDayOfMonth = new Date($today.getUTCFullYear(), $today.getMonth(), 1)
let $lastDateOfMonth = new Date($today.getUTCFullYear(), $monthsNames.indexOf($today.getMonth()) + 1, 0)
let $dateObject = {
    day: $today.getDay(),
    date: $today.getDate(),
    month: $monthsNames[$today.getMonth()],
    year: $today.getUTCFullYear(),
    firstDayOfMonth: $firstDayOfMonth.getDay(),
    lastDateOfMonth: $lastDateOfMonth.getDate()
};


Vue.component('date', {
    props: ['i', 'today', 'dateobject', 'events', 'eventindex'],
    template: `
     <div class="card date px-2 py-1">
                        <p :style = "{visibility: i > dateobject.firstDayOfMonth && i <= dateobject.lastDateOfMonth + dateobject.firstDayOfMonth? 'visible' : 'hidden'}" >
                        <span :class = "i - dateobject.firstDayOfMonth == today.date && 
                        dateobject.month == today.month &&
                            dateobject.year == today.year ? 'today-date' : ''">
                            {{i - dateobject.firstDayOfMonth}}
                            </span>
                            </p>
                        <div div class = "d-flex justify-content-between" v-if="events[eventindex]" >
                            <span class="mr-1"> {{ events[eventindex].title }}</span>
                            <span class="time">10:00AM</span>
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
        events: {}
    },

    mounted() {
        console.log($dateObject)
        if (localStorage.getItem('date')) {
            this.dateObject = JSON.parse(localStorage.getItem('date'));
        } else {
            this.dateObject = $dateObject;
        }
        if (localStorage.getItem('events')) {
            this.events = JSON.parse(localStorage.getItem('events'));
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
            this.dateObject.lastDateOfMonth = lastDayDate.getDate();
            localStorage.setItem('date', JSON.stringify(this.dateObject));

        },
        updateYear: function (e) {
            this.dateObject.year = e.target.value;
            let firstDayDate = new Date();
            let lastDayDate = new Date();
            firstDayDate.setFullYear(this.dateObject.year, this.months.indexOf(this.dateObject.month), 1);
            lastDayDate.setFullYear(this.dateObject.year, this.months.indexOf(this.dateObject.month) + 1, 0);
            this.dateObject.firstDayOfMonth = firstDayDate.getDay();
            this.dateObject.lastDateOfMonth = lastDayDate.getDate();
            localStorage.setItem('date', JSON.stringify(this.dateObject));
        },
        addEvent(date, i) {
            let index = date.year + date.month + (i - date.firstDayOfMonth);
            this.$set(this.events, index, {
                time: index,
                title: "title",
                desc: "desc"
            });
            console.log(this.events)
            localStorage.setItem('events', JSON.stringify(this.events));
        }
    },

    computed: {
        updateEvents: function () {
            return events;
        }
    }
})