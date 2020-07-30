<template>
  <div class="page" @click.stop.prevent="pageClick">
    <Toolbar></Toolbar>
    <div class="screen">
      <components :is="element.type" v-for="element in elements" :key="element.id" :eid="element.id"></components>
    </div>
    <TransformControl></TransformControl>
  </div>
</template>

<script>
  import Toolbar from './Toolbar.vue'
  import TransformControl from './TransformControl.vue'
  import RichText from './RichText.vue'
  import {mapState} from 'vuex'
export default {
  name: 'Page',
  components: {
    Toolbar,
    TransformControl,
    RichText
  },
  computed: {
    ...mapState({
      elements: state => state.pageElements
    })
  },
  methods: {
    pageClick(e) {
      if (e.target.classList.contains('page')) {
        this.$el.focus();
        this.$store.commit('pageSelected');
      }
      return false;
    }
  }
}
</script>

