<template>
  <div :contenteditable="elprop.editable" class="editbox" @dblclick.stop.prevent="onDblClick" @mousedown="mousedownHandle" :style="styleObj" @input="updateText" v-html="elprop.text">
  </div>
</template>
<script>
  export default {
    props: {
      elprop: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        mX: 0,
        mY:0,
        eX:0,
        eY:0
      }
    },
    methods: {
       onDblClick() {
         this.$store.commit('updateProperties', {editable: true,})
       },
       mousedownHandle(e) {
         //e.stopPropagation();
         //e.preventDefault();
         if(!this.elprop.editable) {
           this.mX = e.pageX;
           this.mY = e.pageY;
           this.eX = this.elprop.x;
           this.eY = this.elprop.y;
           this.$store.commit('selectElement', {id: this.elprop.id, h: this.$el.clientHeight, w: this.$el.clientWidth});
           document.addEventListener('mousemove', this.mousemoveHandle, true)
           document.addEventListener('mouseup', this.mouseupHandle, true)
         }
       },
        mousemoveHandle(e) {
           this.isMove = true;
           e.stopPropagation();
           e.preventDefault();
           var dx = e.pageX - this.mX;
           var dy = e.pageY - this.mY;
           this.$store.commit('moveElement', {x: this.eX + dx, y: this.eY + dy});
        },
        mouseupHandle() {
          document.removeEventListener('mousemove', this.mousemoveHandle, true)
          document.removeEventListener('mouseup', this.mouseupHandle, true)
        },
        updateText(event) {
          const strHtml = event.target.innerHTML;
          this.$store.commit('updateHtmlText', strHtml);
        }
    },
    computed: {
      styleObj() {
        const sty = {
          width: this.elprop.width + 'px',
          transform: `translate(${this.elprop.x}px, ${this.elprop.y}px) rotate(${this.elprop.rot}deg)`,
          zIndex: this.elprop.z,
          cursor: this.elprop.editable ? 'auto':'move'
        }
        if(this.elprop.selected) {
          sty.outline = `1px solid blue`
        }
        return sty;
      }
    }
  }
</script>