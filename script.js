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
        events: {
            '2020-06-17': {
                title: 'new one',
                time: '10:00',
                desc: ''
            }
        },
        eventTitle: '',
        eventDate: '',
        eventTime: ''
    },

    mounted() {
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
        addEvent() {
            let eventDate = document.getElementById('eventDate').value;
            let eventTime = document.getElementById('eventTime').value;
            let eventTitle = document.getElementById('eventTitle').value;
            let index = '';
            if (eventDate.charAt(5) == 0) {
                index = eventDate.substr(0, 5) + eventDate.substr(6);
            }
            if (index.charAt(7) == 0) {
                index = index.substr(0, 7) + index.substr(8);
            }
            this.$set(this.events, index, {
                time: eventTime,
                title: eventTitle,
                desc: "desc"
            });
            localStorage.setItem('events', JSON.stringify(this.events));
        },

        delEvent() {
            let eventDate = document.getElementById('eventDate').value;
            if (eventDate.charAt(5) == 0) {
                index = eventDate.substr(0, 5) + eventDate.substr(6);
            }
            if (index.charAt(7) == 0) {
                index = index.substr(0, 7) + index.substr(8);
            }
            console.log(index);
            Vue.delete(this.events, index);
            localStorage.setItem('events', JSON.stringify(this.events));
        },

        getEventIndex(i) {
            return this.dateObject.year + "-" + (this.months.indexOf(this.dateObject.month) + 1) + "-" + (i - this.dateObject.firstDayOfMonth)
        },

        getEventTitle: function (i) {
            if (this.events[this.dateObject.year + "-" + (this.months.indexOf(this.dateObject.month) + 1) + "-" + (i - this.dateObject.firstDayOfMonth)]) {
                let title = this.events[this.dateObject.year + "-" + (this.months.indexOf(this.dateObject.month) + 1) + "-" + (i - this.dateObject.firstDayOfMonth)].title;
                return title;
            }
        },
        getEventTime: function (i) {
            if (this.events[this.dateObject.year + "-" + (this.months.indexOf(this.dateObject.month) + 1) + "-" + (i - this.dateObject.firstDayOfMonth)]) {
                let time = this.events[this.dateObject.year + "-" + (this.months.indexOf(this.dateObject.month) + 1) + "-" + (i - this.dateObject.firstDayOfMonth)].time;
                return time;
            }
        },

        getEventDate: function (i) {
            let date = this.dateObject.month + " " + (i - this.dateObject.firstDayOfMonth) + " " + this.dateObject.year
            return date;
        }
    },
})