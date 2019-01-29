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
        <li><a href="javascript:void(0)" @click.stop.prevent="formatDoc('formatblock','blockquote')"><i class="material-icons">format_quote</i></a></li>
      </ul>
      <ul class="toolbar cf">
        <li><a href="javascript:void(0)" @click.stop.prevent="removeTextElement()"><i class="material-icons">close</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="savePage()"><i class="material-icons">save</i></a></li>
        <li><a href="javascript:void(0)" @click.stop.prevent="clearPage()"><i class="material-icons">delete_forever</i></a></li>
      </ul>
    </div>
</template>
<script>
	export default {
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