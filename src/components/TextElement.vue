<template>
  <div :contenteditable="item.editable" class="editbox" @dblclick.stop.prevent="onDblClick" @mousedown="mousedownHandle" :style="styleObj" @blur="onSelect" @input="updateText" v-html="htext">
  </div>
</template>
<script>
  import controlMixin from './control-mixin'
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
    watch: {
      'item.tmpText': function (nVal) {
        if (nVal !== '') {
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            selection.removeAllRanges();
            selection.addRange(this.prevCursor);
          }
          document.execCommand('insertText', false, nVal);
          this.$nextTick(() => {
            this.updateText();
          });
        }
      }
    },
    mounted() {
      this.htext = this.item.text;
    },
    methods: {
      onDblClick() {
        this.$store.commit('updateProperties', {editable: true})
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