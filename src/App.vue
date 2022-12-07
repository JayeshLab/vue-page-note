<template>
  <div id="app">
    <SideMenu></SideMenu>
    <PageNote></PageNote>
  </div>
</template>

<script>
import SideMenu from "@/components/Menu/SideMenu";
import PageNote from '@/components/PageNote.vue'
import WebFontLoader from 'webfontloader';

export default {
  name: 'app',
  components: {
    SideMenu,
    PageNote
  },
  created() {
    WebFontLoader.load({
      google: {
        families: this.$store.state.fonts
      },
      active: this.onFontLoaded,
    });
  },
  methods: {
    onFontLoaded() {
      // eslint-disable-next-line 
      console.log('Vue Page Notes - Fonts Loaded');
    }
  },
}
</script>
