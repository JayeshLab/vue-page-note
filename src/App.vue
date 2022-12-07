<template>
  <div id="app">
    <SideMenu></SideMenu>
    <Page></Page>
  </div>
</template>

<script>
import SideMenu from "@/components/Menu/SideMenu";
import Page from '@/components/Page.vue'
import WebFontLoader from 'webfontloader';

export default {
  name: 'app',
  components: {
    SideMenu,
    Page
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
      console.log('Fonts Loaded');
    }
  },
}
</script>
