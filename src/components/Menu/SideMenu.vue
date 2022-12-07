<template>
  <div class="side_menu" :style="{'left': isOpen?'0px':'-250px'}">
    <div class="burger_box">
      <div class="menu-icon-container">
        <a href="#" class="menu-icon js-menu_toggle" :class="[isOpen ? 'opened':'closed']" @click="toggelMenu">
            <span class="menu-icon_box">
              <span class="menu-icon_line menu-icon_line--1"></span>
              <span class="menu-icon_line menu-icon_line--2"></span>
              <span class="menu-icon_line menu-icon_line--3"></span>
            </span>
        </a>
      </div>
    </div>
    <div class="container">
      <div class="menu_title"><img height="28px" width="28px" src="@/assets/icon.png"/> Vue Page Note</div>
      <button class="vn-btn full-width" @click="addNewPage">Add New Page</button>
      <ul class="page-list">
        <li class="page-item" v-for="page in pages" :key="page.pid" @click="selectPage(page.pid)" :class="{ active: currentPage.pid == page.pid}">
          <EditableTitle :page="page" :pid="currentPage.pid"></EditableTitle>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditableTitle from "@/components/Menu/EditableTitle";
export default {
  data() {
    return {
      isOpen: false
    }
  },
  components: {
    EditableTitle
  },
  methods: {
    toggelMenu() {
      this.isOpen = !this.isOpen;
    },
    addNewPage () {
      this.$store.dispatch('addNewPage');
    },
    selectPage(pageId) {
      this.$store.dispatch('selectPage', pageId);
    }
  },
  computed: mapState(['pages', 'currentPage'])
}
</script>