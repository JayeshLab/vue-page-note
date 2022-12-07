<template>
  <div class="page" @click="pageClick">
    <ToolbarMenu></ToolbarMenu>
    <div class="screen">
      <components :is="element.type" v-for="element in selectedPageElements" :key="element.id" :eid="element.id" @txtEvent="editboxSelect"></components>
    </div>
    <TransformControl></TransformControl>
  </div>
</template>

<script>
  import ToolbarMenu from '@/components/Menu/ToolbarMenu.vue'
  import TransformControl from '@/components/TransformControl.vue'
  import TextElement from '@/components/Elements/TextElement.vue'
  import ImageElement from '@/components/Elements/ImageElement.vue'
  import {mapState} from 'vuex'
export default {
  name: 'PageNote',
  data() {
    return {
      range: null
    }
  },
  components: {
    ToolbarMenu,
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
    ...mapState(['selectedPageElements', 'formatEvent'])
  },
  methods: {
    editboxSelect() {
      const selection = window.getSelection();
      this.range = selection.getRangeAt(0);
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

