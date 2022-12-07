<template>
  <div :contenteditable="isContentEditable" class="editbox" @click.stop.prevent="onClick" @mousedown="mousedownHandle" :style="styleObj" @blur="onSelect" @input="updateText" v-html="htext">
  </div>
</template>
<script>
  import controlMixin from '../control-mixin'
  export default {
    name: 'TextElement',
    mixins: [controlMixin],
    props: {
      eid: {
        type: String
      }
    },
    data() {
      return {
        prevCursor: null,
        htext: ''
      }
    },
    mounted() {
      this.htext = this.item.content;
    },
    methods: {
      onClick() {
        this.$store.commit('setEditable', this.item.id);
        this.onSelect();
      },
      updateText() {
        const strHtml = this.$el.innerHTML;
        this.$store.commit('updateHtmlText', {txt: strHtml, h: this.$el.clientHeight, w: this.$el.clientWidth});
      },
      onSelect() {
        this.$emit('txtEvent');
      }
    }
  }
</script>