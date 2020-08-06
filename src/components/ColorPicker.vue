<template>
  <li class="dropdown">
    <button @click="show = !show" v-tooltip="'Text Color'"><i class="material-icons">palette</i></button>
    <PopOver :width="215" :height="210" v-show="show">
      <div  class="color-content">
        <a class="pallet" v-for="(value, index) in colors" :key="`c-${index}`" @click.stop.prevent="selectColor(value)" :style="{ background : value }"></a>
      </div>
    </PopOver>
  </li>
</template>
<script>
  import colors from '../utility/colors'
  import PopOver from './PopOver.vue'
  export default {
    name: 'ColorPicker',
    components: {
      PopOver: PopOver
    },
    data() {
      return {
        colors: colors
      };
    },
    computed: {
      show: {
        get() {
          return this.$store.getters.getOpenState('color');
        },
        set(val) {
          this.$store.commit("setIsOpen", ["color", val])
        }
      }
    },
    methods: {
      selectColor(clr) {
        this.$store.commit('setFormatEvent', ['forecolor', clr]);
      }
    }
  }
</script>