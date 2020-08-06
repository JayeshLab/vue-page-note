<template>
  <div class="toolbar-container">
    <ul class="toolbar cf">
      <li>
        <button @click.stop.prevent="addTextElement('TextElement')" v-tooltip="`Add Text`"><i class="material-icons">text_fields</i></button>
      </li>
      <ImageMenu></ImageMenu>
    </ul>
    <ul class="toolbar cf">
      <li>
        <button @click.stop.prevent="formatDoc('undo')" v-tooltip="'Undo'"><i class="material-icons">undo</i></button>
      </li>
      <li>
        <button @click.stop.prevent="formatDoc('redo')" v-tooltip="'Redo'"><i class="material-icons">redo</i></button>
      </li>
      <li>
        <button @click.stop.prevent="formatDoc('removeFormat')" v-tooltip="'Clean Format'"><i class="material-icons">cleaning_services</i></button>
      </li>
    </ul>
    <ul class="toolbar cf">
      <li>
        <button @click.stop.prevent="formatDoc('bold')" v-tooltip="'Bold'"><i class="material-icons">format_bold</i></button>
      </li>
      <li>
        <button @click.stop.prevent="formatDoc('italic')" v-tooltip="'Italic'"><i class="material-icons">format_italic</i></button>
      </li>
      <li>
        <button @click.stop.prevent="formatDoc('underline')" v-tooltip="'Underline'"><i class="material-icons">format_underlined</i></button>
      </li>
      <li>
        <button @click.stop.prevent="formatDoc('justifyleft')" v-tooltip="'Align Left'"><i class="material-icons">format_align_left</i></button>
      </li>
      <li>
        <button @click.stop.prevent="formatDoc('justifycenter')" v-tooltip="'Align Center'"><i class="material-icons">format_align_center</i></button>
      </li>
      <li>
        <button @click.stop.prevent="formatDoc('justifyright')" v-tooltip="'Align Right'"><i class="material-icons">format_align_right</i></button>
      </li>
      <li>
        <button @click.stop.prevent="formatDoc('insertorderedlist')" v-tooltip="'Ordered List'"><i class="material-icons">format_list_numbered</i></button>
      </li>
      <li>
        <button @click.stop.prevent="formatDoc('insertunorderedlist')" v-tooltip="'List'"><i class="material-icons">format_list_bulleted</i></button>
      </li>
      <EmojiPicker></EmojiPicker>
      <li class="dropdown">
        <button @click="isFontMenu = !isFontMenu" v-tooltip="'Font'">
          <i class="material-icons">font_download</i>
        </button>
        <PopOver :width="200" height="240" v-show="isFontMenu">
          <button @click.stop.prevent="formatDoc('fontname','Aladin')" style="font-family: Aladin" class="tool-btn">Aladin</button>
          <button @click.stop.prevent="formatDoc('fontname','Kumar One Outline')" style="font-family: Kumar" class="tool-btn">Kumar</button>
          <button @click.stop.prevent="formatDoc('fontname','Fredericka the Great')" style="font-family: Fredericka the Great" class="tool-btn">Fredericka the Great</button>
          <button @click.stop.prevent="formatDoc('fontname','Indie Flower')" style="font-family: Indie Flower" class="tool-btn">Indie Flower</button>
          <button @click.stop.prevent="formatDoc('fontname','Pacifico')" style="font-family: Pacifico" class="tool-btn">Pacifico</button>
          <button @click.stop.prevent="formatDoc('fontname','Courier Prime')" style="font-family: Courier Prime" class="tool-btn">Courier Prime</button>
          <button @click.stop.prevent="formatDoc('fontname','Poppins')" style="font-family: Poppins" class="tool-btn">Poppins</button>
          <button @click.stop.prevent="formatDoc('fontname','Kaushan Script')" style="font-family: Kaushan Script" class="tool-btn">Kaushan Script</button>
        </PopOver>
      </li>
      <li class="dropdown">
        <button @click="isFontSize = !isFontSize" v-tooltip="'Paragraph Format'">
          <i class="material-icons">text_format</i>
        </button>
        <PopOver :width="330" :height="30" v-show="isFontSize">
          <ul class="htoolbar">
            <li>
              <button @click.stop.prevent="formatDoc('formatblock','h1')">H1</button>
            </li>
            <li>
              <button @click.stop.prevent="formatDoc('formatblock','h2')">H2</button>
            </li>
            <li>
              <button @click.stop.prevent="formatDoc('formatblock','h3')">H3</button>
            </li>
            <li>
              <button @click.stop.prevent="formatDoc('formatblock','h4')">H4</button>
            </li>
            <li>
              <button @click.stop.prevent="formatDoc('formatblock','h5')">H5</button>
            </li>
            <li>
              <button @click.stop.prevent="formatDoc('formatblock','h6')">H6</button>
            </li>
            <li>
              <button @click.stop.prevent="formatDoc('formatblock','blockquote')"><i class="material-icons">format_quote</i></button>
            </li>
            <li>
              <button @click.stop.prevent="formatDoc('formatblock','p')"><i class="material-icons">local_parking</i></button>
            </li>
            <li>
              <button @click.stop.prevent="formatDoc('formatblock','pre')">
                <small>Pre</small>
              </button>
            </li>
          </ul>
        </PopOver>
      </li>
      <ColorPicker></ColorPicker>
    </ul>
    <ul class="toolbar cf">
      <li>
        <button @click.stop.prevent="removeElement()" v-tooltip="'Remove Item'"><i class="material-icons">close</i></button>
      </li>
      <li>
        <button @click.stop.prevent="savePage()" v-tooltip="'Save Page'"><i class="material-icons">save</i></button>
      </li>
      <li>
        <button @click.stop.prevent="clearPage()" v-tooltip="'Delete Page'"><i class="material-icons">delete_forever</i></button>
      </li>
    </ul>
  </div>
</template>
<script>
  import EmojiPicker from './EmojiPicker.vue'
  import ColorPicker from './ColorPicker.vue'
  import ImageMenu from './ImageMenu.vue'
  import PopOver from './PopOver.vue'

  export default {
    components: {
      EmojiPicker,
      ColorPicker,
      ImageMenu,
      PopOver
    },
    computed: {
      isFontMenu: {
        get() {
          return this.$store.getters.getOpenState('font');
        },
        set(val) {
          this.$store.commit("setIsOpen", ["font", val])
        }
      },
      isFontSize: {
        get() {
          return this.$store.getters.getOpenState('headings');
        },
        set(val) {
          this.$store.commit("setIsOpen", ["headings", val])
        }
      },
    },
    methods: {
      addTextElement(type) {
        this.$store.commit('setIsOpen', ["", false]);
        this.$store.commit('addTextElement', type);
      },
      removeElement() {
        this.$store.commit('setIsOpen', ["", false]);
        this.$store.commit('removeElement')
      },
      savePage() {
        this.$store.commit('setIsOpen', ["", false]);
        this.$store.commit('savePage');
      },
      clearPage() {
        this.$store.commit('setIsOpen', ["", false]);
        this.$store.commit('clearPage');
      },
      formatDoc(cmd, val) {
        this.$store.commit('setIsOpen', ["", false]);
        document.execCommand(cmd, false, val)
      }
    }
  }
</script>