<template>
  <div class="ctrl-container no-print">
    <div v-show="element.id === selected" class="control" :style="controlStyle">
      <div class="rot-handle" @mousedown.stop.prevent="mousedownHandle($event, 'rotation')">
        <div class="rhandle" />
      </div>
      <div class="del-handle del" @click="removeElement" title="Delete"></div>
      <div class="ctr-handle lh" @mousedown.stop.prevent="mousedownHandle($event, 'left')" v-if="isText">
        <div class="shandle" />
      </div>
      <div class="ctr-handle rh" @mousedown.stop.prevent="mousedownHandle($event, 'right')" v-if="isText">
        <div class="shandle" />
      </div>
      <div class="cor-handle tr" @mousedown.stop.prevent="mousedownHandle($event, 'topright')" v-if="!isText">
        <div class="chandle" />
      </div>
      <div class="cor-handle br" @mousedown.stop.prevent="mousedownHandle($event, 'bottomright')" v-if="!isText">
        <div class="chandle" />
      </div>
      <div class="cor-handle tl" @mousedown.stop.prevent="mousedownHandle($event, 'topleft')" v-if="!isText">
        <div class="chandle" />
      </div>
      <div class="cor-handle bl" @mousedown.stop.prevent="mousedownHandle($event, 'bottomleft')" v-if="!isText">
        <div class="chandle" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      element: (state) => state.selectedElement,
      selected: (state) => state.selected,
    }),
    isText() {
      return this.element.type === "TextElement";
    },
    controlStyle() {
      return {
        width: `${this.element.width}px`,
        height: `${this.element.height}px`,
        transform: `translate(${this.element.x}px, ${this.element.y}px) rotate(${this.element.rot}deg)`,
        ...(this.element.id === this.selected && { outline: `1px solid blue` }),
      };
    },
  },
  created() {
    this.throttleFun = this.throttle(this.mousemoveHandle, 100);
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
      type: "",
      throttleFun: null,
    };
  },
  methods: {
    mousedownHandle(e, side) {
      this.mX = e.pageX;
      this.mY = e.pageY;
      this.eX = this.element.x;
      this.eY = this.element.y;
      this.w = this.element.width;
      this.h = this.element.height;
      (this.angle = this.element.rot), (this.type = side);
      document.addEventListener("mousemove", this.throttleFun, true);
      document.addEventListener("mouseup", this.mouseupHandle, true);
    },
    throttle(fn, delay) {
      let lastCall = 0;
      return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return fn(...args);
      };
    },
    mousemoveHandle(e) {
      e.stopPropagation();
      e.preventDefault();
      var dx = e.pageX - this.mX;
      var dy = e.pageY - this.mY;
      if (this.type === "right") {
        const width = this.w + dx;
        this.$store.commit("updateProperties", { width: width });
      } else if (this.type === "left") {
        const width = this.w - dx;
        const x = this.eX + dx;
        this.$store.commit("updateProperties", { width: width, x: x });
      } else if (this.type === "topright") {
        this.$store.commit("updateProperties", { width: this.w + dx, height: this.h - dy, y: this.eY + dy });
      } else if (this.type === "bottomright") {
        this.$store.commit("updateProperties", { width: this.w + dx, height: this.h + dy });
      } else if (this.type === "topleft") {
        this.$store.commit("updateProperties", { width: this.w - dx, height: this.h - dy, x: this.eX + dx, y: this.eY + dy });
      } else if (this.type === "bottomleft") {
        this.$store.commit("updateProperties", { width: this.w - dx, height: this.h + dy, x: this.eX + dx });
      } else if (this.type === "rotation") {
        var center_x = this.eX + this.w / 2;
        var center_y = this.eY + this.h / 2;
        var mouse_x = e.pageX;
        var mouse_y = e.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        var degree = radians * (180 / Math.PI) * -1 + 180;
        this.$store.commit("updateProperties", { origin: "center center", rot: degree });
      }
    },
    removeElement() {
      this.$store.commit("setIsOpen", ["", false]);
      this.$store.commit("removeElement");
    },
    mouseupHandle() {
      document.removeEventListener("mousemove", this.throttleFun, true);
      document.removeEventListener("mouseup", this.mouseupHandle, true);
      this.mX = 0;
      this.mY = 0;
      this.eX = 0;
      this.eY = 0;
      this.w = 0;
      this.h = 0;
      this.type = "";
    },
  },
};
</script>
