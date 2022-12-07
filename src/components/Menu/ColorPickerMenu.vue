<template>
  <li class="dropdown">
    <button @click="show = !show" v-tooltip="`${ tip }`"><i class="material-icons">{{ icon }}</i></button>
    <PopOver :width="210" :height="210" v-show="show">
      <div  class="color-content">
        <a class="pallet" v-for="(value, index) in colors" :key="`c-${index}`" @click.stop.prevent="selectColor(value)" :style="{ background : value }"></a>
      </div>
    </PopOver>
  </li>
</template>
<script>
  import colors from '@/utility/colors'
  import PopOver from '@/components/Menu/PopOver.vue'
  export default {
    name: 'ColorPicker',
    props: {
      'type': String,
      'icon' : String,
      'tip': String
    },
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
          return this.$store.getters.getOpenState(this.type);
        },
        set(val) {
          this.$store.commit("setIsOpen", [this.type, val])
        }
      }
    },
    methods: {
      selectColor(clr) {
        this.$store.commit('setFormatEvent', [this.type, clr]);
      }
    }
  }
</script>