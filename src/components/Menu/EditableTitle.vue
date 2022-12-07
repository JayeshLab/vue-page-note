<template>
  <div class="d-flex">
    <div class="page-title" v-if="!isEdit">{{ page.title }} <div class="title-btn edit-title" @click="editTitle"></div></div>
    <div class="page-title" v-else>
      <input class="page-title-input" type="text" v-model="pageTitle">
      <div class="title-btn save-title" @click="updateTitle"></div>
    </div>
    <div class="title-btn delete-title" @click="deletePage"></div>
  </div>
</template>

<script>
export default {
  name: 'EditableTitle',
  props: ['page','pid'],
  data() {
    return {
      pageTitle: '',
      isEdit: false
    }
  },
  watch: {
    pid: function (newval) {
       if(newval  !== this.page.pid) {
        this.isEdit = false;
       }
    }
  },
  methods: {
    editTitle() {
      this.isEdit = true;
      this.pageTitle = this.page.title.slice();
    },
    updateTitle() {
      this.isEdit = false;
      this.$store.commit('updatePageTitle', this.pageTitle);
      this.pageTitle = "";
    },
    deletePage() {
      this.isEdit = false;
      if (confirm("Are you sure you want to delete the page " + this.page.title + " ?") == true) {
        this.$store.dispatch('deletePage', this.page.pid);
        this.pageTitle = "";
      }
    }
  }
}
</script>