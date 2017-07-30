import './assets/build/less/AdminLTE.less'
import './assets/build/less/skins/_all-skins.less'
import $ from 'jquery';
import './assets/js/app.min'
import Vue from 'vue'
import Io from './services/Io'
Vue.prototype.Io = Io
import App from './App'
import BaseHeader from './components/Header'
import BaseSidebar from './components/sidebar'
import BaseFooter from './components/footer'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  //router,
  //template: '<App/>',
  components: {App, BaseHeader, BaseSidebar,BaseFooter}
})
