import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul v-for="item in agenda" class="agenda">
      <li class="agenda__item">
        <!-- meetup agenda item -->
        <MeetupAgendaItem :agenda-item="item" />
      </li>
    </ul>`,
});
