export default {
  methods: {
    data() {
      return {
        isMove: false,
        mX: 0,
        mY: 0,
        eX: 0,
        eY: 0
      }
    },
    mousedownHandle(e) {
      if (this.editable != this.item.id) {
        this.mX = e.pageX;
        this.mY = e.pageY;
        this.eX = this.item.x;
        this.eY = this.item.y;
        this.$store.commit('selectElement', {id: this.item.id, h: this.$el.clientHeight, w: this.$el.clientWidth});
        document.addEventListener('mousemove', this.mousemoveHandle, true)
        document.addEventListener('mouseup', this.mouseupHandle, true)
      }
      else
      {
        document.addEventListener('mouseup', this.selectionHandle, true)
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
    selectionHandle() {
      const selection = window.getSelection();
      this.parentTagActive(selection.anchorNode.parentNode);
      document.removeEventListener('mouseup', this.selectionHandle, true)
    },
    mouseupHandle() {
      this.$store.commit('onPositionChange');
      document.removeEventListener('mousemove', this.mousemoveHandle, true)
      document.removeEventListener('mouseup', this.mouseupHandle, true)
    },
    getSelectedText() {
      if (window.getSelection) {
        return window.getSelection().toString();
      } else if (document.selection) {
        return document.selection.createRange().text;
      }
      return '';
    },
    parentTagActive(elem) {
      if(!elem ||!elem.classList || elem.classList.contains('editbox')) return false;
      return this.parentTagActive(elem.parentNode);
    }
  },
  computed: {
    item() {
      return this.$store.getters.getElement(this.eid);
    },
    selected() {
      return this.$store.state.selected;
    },
    editable() {
      return this.$store.state.editable;
    },
    isContentEditable() {
      return this.item.id === this.$store.state.editable;
    },
    isImage() {
      return this.item.type === 'ImageElement';
    },
    styleObj() {
      const style = {
        width: `${this.item.width}px`,
        transform: `translate(${this.item.x}px, ${this.item.y}px) rotate(${this.item.rot}deg)`,
        zIndex: this.item.z,
        cursor: this.isContentEditable ? 'auto' : 'move'
      }
      if(this.isImage) {
        style.height = `${this.item.height}px`
      }
      return style;
    },

  }
}