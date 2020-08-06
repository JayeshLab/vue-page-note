<template>
  <div class="page" @click="pageClick" @keyup.delete="removeElement">
    <Toolbar></Toolbar>
    <div class="screen">
      <components :is="element.type" v-for="element in pageElements" :key="element.id" :eid="element.id" @txtEvent="editboxSelect"></components>
    </div>
    <TransformControl></TransformControl>
  </div>
</template>

<script>
  import Toolbar from './Toolbar.vue'
  import TransformControl from './TransformControl.vue'
  import TextElement from './TextElement.vue'
  import ImageElement from './ImageElement.vue'
  import {mapState} from 'vuex'
export default {
  name: 'Page',
  data() {
    return {
      range: null
    }
  },
  components: {
    Toolbar,
    TransformControl,
    TextElement,
    ImageElement
  },
  watch: {
    formatEvent: function(val) {
       const selection = window.getSelection();
       if (selection.rangeCount > 0 && this.range) {
         selection.removeAllRanges();
         selection.addRange(this.range);
         this.$nextTick(() => {
           document.execCommand(val[0], false, val[1]);
         });
         // this.range = null;
       }
     }
  },
  computed: {
    ...mapState(['pageElements', 'formatEvent'])
  },
  methods: {
    editboxSelect() {
      const selection = window.getSelection();
      this.range = selection.getRangeAt(0);
    },
    removeElement() {
      this.$store.commit('setIsOpen', ["", false]);
      this.$store.commit('removeElement')
    },
    pageClick(e) {
      if (e.target.classList.contains('page')) {
        this.$el.focus();
        this.range = null;
        this.$store.commit('setIsOpen', ["", false]);        this.$store.commit('pageSelected');
      }
      return false;
    }
  }
}
</script>

