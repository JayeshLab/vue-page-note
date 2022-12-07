import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/assets/app.scss'

Vue.config.productionTip = false

Vue.directive('tooltip', {
  bind: function (el, binding) {
    el.addEventListener('mouseenter', function () {
      const $tooltip = document.createElement('div');
      const $tooltipDimension = el.getBoundingClientRect();
      $tooltip.setAttribute('class', 'tooltip');
      $tooltip.setAttribute('id', 'ToolTip');
      $tooltip.innerHTML = binding.value;
      $tooltip.style.left = $tooltipDimension.left + ($tooltipDimension.width / 2) + 'px';
      $tooltip.style.top = $tooltipDimension.top - 30 + 'px';
      document.body.appendChild($tooltip)
    })
    el.addEventListener('mouseleave', function () {
      const elemToRemove = document.getElementById('ToolTip');
      elemToRemove.parentNode.removeChild(elemToRemove);
    })
  }
});
new Vue({
  store,
  beforeCreate() {
    this.$store.dispatch('initialiseStore');
  },
  render: h => h(App)
}).$mount('#app')
