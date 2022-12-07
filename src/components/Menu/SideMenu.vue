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
      <h2 class="menu_title"><img height="24px" width="24px" src="../assets/icon.png"/> Vue Page Note</h2>
      <button>Add New Page</button>
      <ul class="list_load">
        <li class="list_item"><a href="#">List Item 01</a></li>
        <li class="list_item"><a href="#">List Item 02</a></li>
        <li class="list_item"><a href="#">List Item 03</a></li>
        <li class="list_item"><a href="#">List Item 04</a></li>
        <li class="list_item"><a href="#">List Item 05</a></li>
        <li class="list_item"><a href="#">List Item 06</a></li>
        <li class="list_item"><a href="#">List Item 07</a></li>
        <li class="list_item"><a href="#">List Item 08</a></li>
      </ul>
      <div class="spacer_box"><p>This is a spacer box.</p></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggelMenu() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>

<style scoped>

</style>