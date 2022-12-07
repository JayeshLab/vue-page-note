<template>
  <img :src="item.image" :height="item.image.height" class="image-element" :style="styleObj" @mousedown="mousedownHandle"/>
</template>
<script>
  import controlMixin from './control-mixin'
	export default {
    name: 'ImageElement',
    mixins: [controlMixin],
    props: {
      eid: {
        type: String
      }
    }
	}
</script>