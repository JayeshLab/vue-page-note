<template>
  <li class="dropdown">
    <button @click.prevent="show = !show" v-tooltip="`Add Image`"><i class="material-icons">image</i></button>
    <PopOver :width="230" :height="160" v-show="show">
      <div class="input-with-icon">
        <input class="input-link" type="text" v-model="imgurl" placeholder="Add Image link" @keyup.enter="addImageLink"/>
        <i class="material-icons input-icon" @click="addImageLink">insert_link</i>
      </div>
      <div class="hr-line"><span>or</span></div>
      <div class="drop-zone" :class="[isOver ? 'bg-green':'bg-gray']" @click="triggerFile" @dragover.prevent="isOver = true" @dragleave.prevent="isOver = false" @drop="drop">
        <span class="drop-zone-text"><b>Drop Image</b><br>(or click {{isOver}})</span>
        <input ref="imgfile" name="imgfile" type="file" @change="fileUpdate" class="drop-zone-input" accept="image/png, image/jpeg">
      </div>
    </PopOver>
  </li>
</template>
<script>
  import PopOver from './PopOver.vue'
  export default {
    name: 'ImageMenu',
    components: {
      PopOver
    },
    watch: {
      show: function () {
        this.imgurl = "";
      }
    },
    data() {
      return {
        imgurl: '',
        isOver: false
      };
    },
    computed: {
      show: {
        get() {
          return this.$store.getters.getOpenState('img');
        },
        set(val) {
          this.$store.commit("setIsOpen", ["img", val])
        }
      }
    },
    methods: {
      triggerFile() {
        const el = this.$refs['imgfile'];
        el.click();
      },
      addImageFile(e) {
        let droppedFiles = e.dataTransfer.files;
        if(droppedFiles) {
          const el = this.$refs['imgfile'];
          el.files = droppedFiles;
        }
      },
      drop(event) {
        event.preventDefault();
        this.$refs['imgfile'].files = event.dataTransfer.files;
        this.fileUpdate();
        this.isOver = false;
      },
      fileUpdate() {
        const self = this;
        const el = this.$refs['imgfile'];
        if(el.files.length) {
          const file = el.files[0];
          if ( /\.(jpe?g|png|gif|svg)$/i.test(file.name) ) {
            const reader = new FileReader();
            reader.addEventListener("load", function() {
              self.$store.commit('addImageElement', {height: this.height, image: this.result, width: this.width});
              self.show = false;
              self.imgurl = "";
            }, false);
            reader.readAsDataURL(file);
          }
        }
      },
      addImageLink() {
        const self = this;
        if(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i.test(this.imgurl)) {
          const img = new Image();
          img.onload = function() {
            self.$store.commit('addImageElement', {height: this.height, image: this.src, width: this.width});
            self.show = false;
            self.imgurl = "";
          };
          img.onerror = function() {
            alert( "Not a valid Image file");
          };
          img.src = this.imgurl;
        }
      }
    }
  }
</script>