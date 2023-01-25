import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',

  data() {
    return {
      numberOne: 0,
      numberTwo: 0,
      operator: 'sum',
    };
  },

  computed: {
    result() {
      let result;
      const { numberOne, numberTwo, operator } = this;

      switch (operator) {
        case 'sum':
          result = numberOne + numberTwo;
          break;

        case 'subtract':
          result = numberOne - numberTwo;
          break;

        case 'multiply':
          result = numberOne * numberTwo;
          break;

        case 'divide':
          result = numberOne / numberTwo;
          break;
      }

      return result;
    },
  },
});

createApp(App).mount('#app');
