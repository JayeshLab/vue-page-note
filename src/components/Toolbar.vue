<template>
    <div class="toolbar-container">
      <ul class="toolbar cf">
        <li><a href="javascript:void(0)" @click.stop.prevent="addTextElement('RichText')"><i class="material-icons">text_fields</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="addTextElement('RichText')"><i class="material-icons">image</i></a></li>
      </ul>
      <ul class="toolbar cf">
        <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('bold')"><i class="material-icons">format_bold</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('italic')"><i class="material-icons">format_italic</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('underline')"><i class="material-icons">format_underlined</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('justifyleft')"><i class="material-icons">format_align_left</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('justifycenter')"><i class="material-icons">format_align_center</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('justifyright')"><i class="material-icons">format_align_right</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('insertorderedlist')"><i class="material-icons">format_list_numbered</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('insertunorderedlist')"><i class="material-icons">format_list_bulleted</i></a></li>
        <EmojiPicker></EmojiPicker>
        <li class="dropdown">
          <a href="javascript:void(0)"><i class="material-icons">
            font_download
          </i>
          </a>
          <div class="dropdown-content">
            <a href="javascript:void(0)" @click.stop.prevent="formatDoc('fontname','Aladin')" style="font-family: Aladin">Aladin</a>
            <a href="javascript:void(0)" @click.stop.prevent="formatDoc('fontname','Kumar One Outline')" style="font-family: Kumar">Kumar</a>
            <a href="javascript:void(0)" @click.stop.prevent="formatDoc('fontname','Fredericka the Great')" style="font-family: Fredericka the Great">Fredericka the Great</a>
            <a href="javascript:void(0)" @click.stop.prevent="formatDoc('fontname','Indie Flower')" style="font-family: Indie Flower">Indie Flower</a>
            <a href="javascript:void(0)" @click.stop.prevent="formatDoc('fontname','Pacifico')" style="font-family: Pacifico">Pacifico</a>
            <a href="javascript:void(0)" @click.stop.prevent="formatDoc('fontname','Courier Prime')" style="font-family: Courier Prime">Courier Prime</a>
            <a href="javascript:void(0)" @click.stop.prevent="formatDoc('fontname','Poppins')" style="font-family: Poppins">Poppins</a>
            <a href="javascript:void(0)" @click.stop.prevent="formatDoc('fontname','Kaushan Script')" style="font-family: Kaushan Script">Kaushan Script</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="javascript:void(0)">
            <i class="material-icons">
            text_format
            </i>
          </a>
          <div class="sub">
            <div class="arrow" style="left: 50%; right: 50%;"></div>
            <ul class="toolbar">
              <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('formatblock','h1')">H1</a></li>
              <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('formatblock','h2')">H2</a></li>
              <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('formatblock','h3')">H3</a></li>
              <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('formatblock','h4')">H4</a></li>
              <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('formatblock','h5')">H5</a></li>
              <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('formatblock','h6')">H6</a></li>
              <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('formatblock','blockquote')"><i class="material-icons">format_quote</i></a></li>
              <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('formatblock','p')"><b>P</b></a></li>
              <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('formatblock','pre')"><small>Pre</small></a></li>
            </ul>
          </div>
        </li>
      </ul>
      <ul class="toolbar cf">
        <li><a href="javascript:void(0)" @click.stop.prevent="removeTextElement()"><i class="material-icons">close</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="savePage()"><i class="material-icons">save</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="clearPage()"><i class="material-icons">delete_forever</i></a></li>
      </ul>
    </div>
</template>
<script>
  import EmojiPicker from './EmojiPicker.vue'
	export default {
    components: {
      EmojiPicker
    },
		methods: {
      addTextElement(type) {
        this.$store.commit('addTextElement',type);
      },
      removeTextElement() {
        this.$store.commit('removeTextElement')
      },
      savePage(){
        this.$store.commit('savePage');
      },
      clearPage() {
        this.$store.commit('clearPage');
      },
      formatDoc(cmd, val) {
        document.execCommand(cmd, false, val)
      }
		}
	}
</script>
<style lang="scss">

  .dropbtn {
    background-color: #4CAF50;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }
  .sub {
    display: none;
  }
  .arrow {
    border-color: transparent transparent #9eb0c1;
    bottom: -10px;
    margin-left: -7px;
    width: 0;
    height: 0;
    position: absolute;
    border-width: 7px;
    border-style: solid;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    width: 150px;
    border-radius: 4px;
    background-color: #8795b7;
    left: -60px;
    padding: 1px 0px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  .emoji-content {
    width: 210px;
    background: white;
  }
  .dropdown-content a {
    background: #f4f7f9;
    padding: 8px;
    border: 0px;
    //background: linear-gradient(to right, #c6d2df 0%,#f7fafd 4%,#ecf2f7 30%,#e4ebf3 68%,#dce4ee 89%,#f7fafd 92%,#c7d3e0 96%,#c6d2df 100%);
    background: linear-gradient(90deg, rgba(198,210,223,1) 0%, rgba(225,232,241,1) 5%, rgba(234,242,250,1) 20%, rgba(234,242,250,1) 80%, rgba(225,232,241,1) 95%, rgba(198,210,223,1) 100%);
    border-top: 1px solid rgba(79, 123, 170, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    color: #295fa6;
    display: block;
    height: 100%;
    text-decoration: none;
    text-shadow: 0 1px 0 #fff;
    text-align: center;
    vertical-align: middle;
    font-size: 18px;
    &:hover {
      color:black;
      font-weight: bold;
    }
  }

  .dropdown-content a:hover {background-color: #ddd;}

  .dropdown:hover .dropdown-content {display: block;}

  .dropdown:hover .sub {display: flex;}
  .sub {
    .toolbar {
      position: relative;
      left: -133px;
      top: 10px;
      a {
        line-height: 32px;
      }
    }
  }

  .dropdown:hover .dropbtn {background-color: #3e8e41;}

</style>