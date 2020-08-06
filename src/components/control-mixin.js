export default {
  methods: {
    data() {
      return {
        mX: 0,
        mY: 0,
        eX: 0,
        eY: 0
      }
    },
    mousedownHandle(e) {
      if (!this.item.editable) {
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
    }
  },
  computed: {
    item() {
      return this.$store.getters.getElement(this.eid);
    },
    isImage() {
      return this.item.type === 'ImageElement';
    },
    styleObj() {
      const style = {
        width: `${this.item.width}px`,
        transform: `translate(${this.item.x}px, ${this.item.y}px) rotate(${this.item.rot}deg)`,
        zIndex: this.item.z,
        cursor: this.item.editable ? 'auto' : 'move'
      }
      if(this.isImage) {
        style.height = `${this.item.height}px`
      }
      return style;
    },

  }
}