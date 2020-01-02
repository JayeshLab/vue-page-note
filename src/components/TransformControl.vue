<template>
  <div class="ctrl-container">
    <div v-show="element.selected" class="control" :style="controlStyle">
      <div class="rot-handle" @mousedown.stop.prevent="mousedownHandle($event, 'rotation')">
        <div class="handle"/>
      </div>
      <div class="ctr-handle lh" @mousedown.stop.prevent="mousedownHandle($event, 'left')">
        <div class="handle"/>
      </div>
      <div class="ctr-handle rh" @mousedown.stop.prevent="mousedownHandle($event,'right')">
        <div class="handle"/>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
	export default {
    computed: {
      ...mapState({
        element: state => state.selectedElement
      }),
      controlStyle() {
        return {
          width: `${this.element.width}px`,
          height: `${this.element.height}px`,
          transform: `translate(${this.element.x}px, ${this.element.y}px) rotate(${this.element.rot}deg)`,
        }
      }
    },
    data() {
      return {
        mX: 0,
        mY: 0,
        eX: 0,
        eY: 0,
        w: 0,
        h: 0,
        angle: 0,
        type:'',
      }
    },
		methods: {
      mousedownHandle(e, side) {
        this.mX = e.pageX;
        this.mY = e.pageY;
        this.eX = this.element.x;
        this.eY = this.element.y;
        this.w = this.element.width;
        this.h = this.element.height;
        this.angle = this.element.rot,
        this.type = side;
        document.addEventListener('mousemove', this.mousemoveHandle, true)
        document.addEventListener('mouseup', this.mouseupHandle, true)
      },
      mousemoveHandle(e) {
        e.stopPropagation();
        e.preventDefault();
        var dx = e.pageX - this.mX;
        // var dy = e.pageY - this.mY;
        if (this.type === 'right') {
          const width = this.w + dx;
          this.$store.commit('updateProperties', {width: width})
        }
        if(this.type === 'left') {
          const width = this.w - dx;
          const x = this.eX + dx;
          this.$store.commit('updateProperties', {width: width, x: x})
        }
        if(this.type === 'rotation'){
          var center_x = (this.eX) + (this.w / 2);
          var center_y = (this.eY) + (this.h / 2);
          var mouse_x = e.pageX;
          var mouse_y = e.pageY;
          var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
          var degree = (radians * (180 / Math.PI) * -1) + 180;
          this.$store.commit('updateProperties', {rot: degree})
        }
      },
      mouseupHandle() {
        document.removeEventListener('mousemove', this.mousemoveHandle, true)
        document.removeEventListener('mouseup', this.mouseupHandle, true)
        this.mX = 0;
        this.mY = 0;
        this.eX = 0;
        this.eY = 0;
        this.w = 0;
        this.h = 0;
        this.type = ''
      }
		}
	}
</script>
<style lang="scss">

</style>