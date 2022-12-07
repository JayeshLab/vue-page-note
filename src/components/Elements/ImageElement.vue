<template>
  <img :src="item.content" :height="item.content.height" class="image-element" :style="styleObj" @mousedown="mousedownHandle"/>
</template>
<script>
  import controlMixin from '@/components/control-mixin'
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