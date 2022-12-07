b<template>
  <div class="toolbar-container no-print">
    <ul class="toolbar cf">
      <li>
        <button @click.stop.prevent="addTextElement('TextElement')" v-tooltip="`Add Text`"><i class="material-icons">title</i></button>
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
        <button @click.stop.prevent="clearPage" v-tooltip="'Reset Page'"><i class="material-icons">restart_alt</i></button>
      </li>
      <li>
        <button @click.stop.prevent="formatDoc('removeFormat')" v-tooltip="'Clean Format'"><i class="material-icons">format_clear</i></button>
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
          <div v-for="font in fonts"  :key="font" class="font-display">
            <button  @click.stop.prevent="formatDoc('fontname',font)" :style="{fontFamily: font}" class="font-btn">
            {{ font }}
            </button>
            <button class="font-del-btn" @click="delFont(font)">X</button>
          </div>
          <div class="input-with-icon" style="margin-top: 10px">
            <input class="input-link" type="text" v-model="fontName" placeholder="Add Google Font Name" @keyup.enter="addImageLink"/>
            <i class="material-icons input-icon" @click="addFont">add</i>
          </div>
        </PopOver>
      </li>
      <li class="dropdown">
        <button @click="isSize = !isSize" v-tooltip="'Font Size'">
          <i class="material-icons">format_size</i>
        </button>
        <PopOver :width="150" height="215" v-show="isSize">
          <button @click.stop.prevent="formatDoc('fontsize','1')" class="tool-btn">Very small</button>
          <button @click.stop.prevent="formatDoc('fontsize','2')" class="tool-btn">A bit small</button>
          <button @click.stop.prevent="formatDoc('fontsize','3')" class="tool-btn">Normal</button>
          <button @click.stop.prevent="formatDoc('fontsize','4')" class="tool-btn">Medium-large</button>
          <button @click.stop.prevent="formatDoc('fontsize','5')" class="tool-btn">Big</button>
          <button @click.stop.prevent="formatDoc('fontsize','6')" class="tool-btn">Very big</button>
          <button @click.stop.prevent="formatDoc('fontsize','7')" class="tool-btn">Maximum</button>
        </PopOver>
      </li>
      <li class="dropdown">
        <button @click="isFontSize = !isFontSize" v-tooltip="'Paragraph Format'">
          <i class="material-icons">local_parking</i>
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
      <ColorPicker type="forecolor" icon="format_color_text" tip="Text Color"></ColorPicker>
      <ColorPicker type="backcolor" icon="color_lens" tip="Background Color"></ColorPicker>

    </ul>
  </div>
</template>
<script>
  import EmojiPicker from './EmojiPickerMenu.vue'
  import ColorPicker from './ColorPickerMenu.vue'
  import ImageMenu from './ImageMenu.vue'
  import PopOver from './PopOver.vue'
  import WebFontLoader from 'webfontloader';
  export default {
    data() {
      return {
        fontName: ''
      }
    },
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
      isSize: {
        get() {
          return this.$store.getters.getOpenState('size');
        },
        set(val) {
          this.$store.commit("setIsOpen", ["size", val])
        }
      },
      fonts() {
        return this.$store.state.fonts;
      }

    },
    methods: {
      addTextElement(type) {
        this.$store.commit('setIsOpen', ["", false]);
        this.$store.commit('addTextElement', type);
      },
      savePage() {
        this.$store.commit('setIsOpen', ["", false]);
      },
      clearPage() {
        this.$store.commit('setIsOpen', ["", false]);
        this.$store.commit('clearPage');
      },
      formatDoc(cmd, val) {
        this.$store.commit('setIsOpen', ["", false]);
        document.execCommand(cmd, false, val)
      },
      addFont() {
        if(this.fontName != "") {
          this.$store.commit('addFont', this.fontName);
          const self = this;
          WebFontLoader.load({
            google: {
              families: this.$store.state.fonts
            },
            active: function () { self.fontName = ""; }
          });
        }
      },
      delFont(fontName) {
        if(fontName != "") {
          this.$store.commit('delFont', fontName);
        }
      }
    }
  }
</script>