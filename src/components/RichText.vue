<template>
  <div :contenteditable="item.editable" class="editbox" @dblclick.stop.prevent="onDblClick" @mousedown="mousedownHandle" :style="styleObj" @input="updateText" v-html="htext">
  </div>
</template>
<script>
  export default {
    props: {
      elid : {
        type: String
      }
    },
    data() {
      return {
        mX: 0,
        mY:0,
        eX:0,
        eY:0,
        htext:''
      }
    },
    created() {
      this.htext = this.item.text;
    },
    methods: {
       onDblClick() {
         this.$store.commit('updateProperties', {editable: true,})
       },
       mousedownHandle(e) {
         //e.stopPropagation();
         //e.preventDefault();
         if(!this.item.editable) {
           this.mX = e.pageX;
           this.mY = e.pageY;
           this.eX = this.item.x;
           this.eY = this.item.y;
           this.$store.commit('selectElement', {id: this.item.id, h: this.$el.clientHeight, w: this.$el.clientWidth});
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
      item() {
        return this.$store.getters.getElement(this.elid);
      },
      styleObj() {
        const sty = {
          width: this.item.width + 'px',
          transform: `translate(${this.item.x}px, ${this.item.y}px) rotate(${this.item.rot}deg)`,
          zIndex: this.item.z,
          cursor: this.item.editable ? 'auto':'move'
        }
        if(this.item.selected) {
          sty.outline = `1px solid blue`
        }
        return sty;
      },

    },

  }
</script>