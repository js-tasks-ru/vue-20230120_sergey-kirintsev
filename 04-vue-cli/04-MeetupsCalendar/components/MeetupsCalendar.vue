<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="decrementMonth"
        ></button>
        <div class="calendar-view__date">{{ title }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="incrementMonth"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="{ day, meetupsList } in calendarList"
        :key="day.getTime()"
        :class="['calendar-view__cell', { 'calendar-view__cell_inactive': !isCurrentMonth(day) }]"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ day.getDate() }}</div>
        <div class="calendar-view__cell-content">
          <a v-for="item in meetupsList" :key="item.id" :href="`/meetups/${item.id}`" class="calendar-event">{{
            item.title
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: null,
    };
  },

  computed: {
    currentMonth() {
      return this.date.getMonth();
    },

    title() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    calendarFirstDay() {
      const offset = {
        0: 6,
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 5,
      };
      const firstDate = new Date(this.date);
      firstDate.setDate(1);

      const weekday = firstDate.getDay();

      const startDate = new Date(firstDate);
      startDate.setDate(1 - offset[weekday]);

      return startDate;
    },

    lastDayOfMonth() {
      const year = this.date.getFullYear();
      const month = this.date.getMonth();
      const lastDate = new Date(year, month + 1, 0);
      return lastDate;
    },

    calendarLength() {
      const calendarLastDay = this.calendarFirstDay;

      calendarLastDay.setDate(calendarLastDay.getDate() + 27);

      if (this.lastDayOfMonth.getTime() <= calendarLastDay.getTime()) {
        return 28;
      }

      calendarLastDay.setDate(calendarLastDay.getDate() + 7);
      if (this.lastDayOfMonth.getTime() <= calendarLastDay.getTime()) {
        return 28 + 7;
      }

      return 28 + 7 + 7;
    },

    calendarDates() {
      const currentDay = new Date(this.calendarFirstDay);
      return new Array(this.calendarLength).fill(null).map(() => {
        const day = new Date(currentDay);
        currentDay.setDate(currentDay.getDate() + 1);
        return day;
      });
    },

    filteredMeetups() {
      const firstDay = this.calendarDates.at(0).getTime();
      const lastDay = this.calendarDates.at(-1).getTime();
      return this.meetups.filter(({ date }) => date >= firstDay && date <= lastDay);
    },

    calendarList() {
      return this.calendarDates.map((day) => {
        const meetupsList = this.filteredMeetups.filter((meetup) => this.isEqualDates(meetup.date, day));
        return { day, meetupsList };
      });
    },
  },

  created() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    this.date = new Date(year, month, 1);
  },

  methods: {
    incrementMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
    },

    decrementMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
    },

    isCurrentMonth(date) {
      return this.currentMonth === date.getMonth();
    },

    isEqualDates(date1, date2) {
      const equalDate1 = new Date(date1);
      const equalDate2 = new Date(date2);
      return equalDate1.toLocaleDateString() === equalDate2.toLocaleDateString();
    },
  },
};
</script>

<style scoped>
/* .calendar-view {
} */

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
