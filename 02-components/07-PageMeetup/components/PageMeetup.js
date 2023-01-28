import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService';
import MeetupView from '../../06-MeetupView/components/MeetupView';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      isLoading: false,
      errorMessage: '',
    };
  },

  watch: {
    meetupId: {
      handler(newMeetupId) {
        this.meetup = null;
        this.isLoading = true;
        this.errorMessage = '';

        fetchMeetupById(newMeetupId)
          .then((meetup) => {
            this.meetup = meetup;
          })
          .catch((error) => {
            this.errorMessage = error.message;
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
      immediate: true,
    },
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <MeetupView v-if="meetup" :meetup="meetup" />

      <UiContainer v-if="isLoading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else-if="errorMessage">
        <UiAlert>{{ errorMessage }}</UiAlert>
      </UiContainer>
    </div>`,
});
