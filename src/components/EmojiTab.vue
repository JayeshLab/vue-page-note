<template>
  <div v-show='isActive' class="emoji-group tab-pane">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'EmojiTab',
    props: ['title', 'selected'],
    computed: {
      isActive() {
        return this.title === this.selected;
      }
    }
  }
</script>