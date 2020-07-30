<template>
  <li class="dropdown">
    <a href="javascript:void(0)" class="emoji-button">😄</a>
    <div class="emoji-content dropdown-content">
      <ul class="emoji-selector">
        <li v-for="group in groups" :key="group.name"><a @click="selectGroup(group.name)">{{group.symbol}}😄️</a></li>
      </ul>
      <div class="tab-content">
        <EmojiTab v-for="grp in groups" :key="`t-${grp.name}`" :selected="selectedGroup" :title="grp.name">
          <a v-for="(value, name) in emojis[grp.name]" :key="name" @click="selectEmoji(value)">{{value}}</a>
        </EmojiTab>
      </div>
    </div>
  </li>
</template>
<script>
  import emojis from '../utility/emojis';
  import EmojiTab from './EmojiTab.vue'
  export default {
    name: 'EmojiPicker',
    data() {
      return {
        groups: [{name: 'People', symbol: '😄'}, {name: 'Nature', symbol: '🐶'}, {name: 'Objects', symbol:'⚽'},{name: 'Places', symbol: '🏠'}, {name: 'Symbols', symbol:'🔢'}],
        selectedGroup: 'People',
        emojis: emojis
      }
    },
    components: {
      EmojiTab: EmojiTab
    },
    methods: {
      selectEmoji(e) {
        console.log(e);
        this.$store.commit('appendHtmlText', e);
      },
      selectGroup(name) {
        this.selectedGroup = name;
      }
    }
  }
</script>
<style lang="scss">
  $background-color: #fff;
  $border-color: #ccc;
  $box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);

  .emoji-button {
    cursor: pointer;
    line-height: 1.6;
    font-size: 22px;
  }

  .emoji {
    color: transparent;
    display: inline-block;
    font-size: 18px;
    font-style: normal;
    height: 25px;
    width: 25px;

    &::selection {
      background-color: highlight;
      color: transparent;
    }

    &-image {
      font-size: 14px;
      line-height: 28px;
    }

    &-area {
      clear: both;
      position: relative;
    }

    &-editor {
      -moz-appearance: textfield-multiline;
      -webkit-appearance: textarea;

      border: 1px solid $border-color;
      border-radius: 3px;
      box-shadow: $box-shadow;
      box-sizing: border-box;
      cursor: text;
      font: medium -moz-fixed;
      -webkit-font-smoothing: antialiased;
      height: 100px;
      overflow: auto;
      padding: 5px;
      resize: both;
      width: 100%;

      * {
        margin: 0;
        padding: 0;
      }
    }

    &-picker {
      background-color: $background-color;
      border: 1px solid $border-color;
      position: absolute;
      width: 210px;
      z-index: 99999;

      a {
        cursor: pointer;
        display: inline-block;
        font-size: 20px;
        padding: 3px;

      }
    }

    &-selector {
      border-bottom: 1px solid $border-color;
      display: flex;
      padding: 0;
      height: 36px;
      background: linear-gradient(to bottom, #f4f7f9 0%, #f7fafd 4%, #ecf2f7 30%, #e4ebf3 68%, #dce4ee 89%, #d5e0eb 92%, #c7d3e0 96%, #c6d2df 100%);
      li {
        width: 45px !important;
        height: 24px !important;
        line-height: 1.5;
        a {
          font-size: 20px;
          border: none;
          padding: 6px;
          &:hover {
            background-color: #5c8abb;
          }
        }
      }
    }

    &-group {
      display: grid;
      grid-template-columns: repeat(6, 16.6666666%);
      height: 200px;
      overflow-y: scroll;
      padding: 3px;
      a {
        background: white !important;
        border: none !important;
        padding: 3px !important;
        display: inline-block;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          background-color: #5c8abb;
        }
      }
    }
  }
</style>