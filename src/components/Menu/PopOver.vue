<template>
  <div class="popover-box" :style="{'width': `${width}px`, 'height': `${height}px`, 'left': `-${(width/2) - 12}px`}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: "PopOver",
    props: ['width', 'height']
  }
</script>