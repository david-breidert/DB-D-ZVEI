import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import settings from 'electron-settings';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: settings.getSync('darkMode') as boolean,
    options: {
      customProperties: true
    },
    themes: {
      light: {
        bgPrimary: '#E3E5E8',
        bgSecondary: '#F2F3F5',
        bgTertiary: '#F5F6F8',
        bgQuarternary: '#FFFFFF'
      },
      dark: {
        bgPrimary: '#202225',
        bgSecondary: '#2f3136',
        bgTertiary: '#36393F',
        bgQuarternary: '#40444B'
      }
    }
  }
});
