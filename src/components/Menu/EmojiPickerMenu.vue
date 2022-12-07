<template>
  <li class="dropdown">
    <button @click.prevent="show = !show" v-tooltip="'Emoji'"><i class="material-icons">sentiment_satisfied_alt</i></button>
    <PopOver :width="230" :height="245" v-show="show" style="padding:0">
      <ul class="emoji-selector">
        <li v-for="({name, sym}) in groups" :key="name" :class="[selectedGroup === name ? 'active': '']" @click.stop.prevent="selectGroup(name)"><a>{{sym}}</a></li>
      </ul>
      <div class="tab-content">
        <EmojiTab v-for="grp in groups" :key="`t-${grp.name}`" :selected="selectedGroup" :title="grp.name">
          <span class="icon" v-for="(value, name) in emojis[grp.name]" :key="name" @click.stop.prevent="selectEmoji(value)">{{value}}</span>
        </EmojiTab>
      </div>
    </PopOver>
  </li>
</template>
<script>
  import emojis from '@/utility/emojis';
  import EmojiTab from '@/components/Elements/EmojiTab.vue'
  import PopOver from '@/components/Menu/PopOver.vue'

  export default {
    name: 'EmojiPicker',
    data() {
      return {
        groups: [{ "name" : 'People', "sym" : emojis['People']['smile']}, { "name" : 'Nature', "sym" : emojis['Nature']['dog']  }, { "name": 'Objects', "sym" : emojis['Objects']['gift'] }, { "name": 'Places', "sym" : emojis['Places']['house'] }, { "name": 'Symbols', "sym" : emojis['Symbols']['100']  }],
        selectedGroup: 'People',
        emojis: emojis
      }
    },
    components: {
      EmojiTab: EmojiTab,
      PopOver: PopOver
    },
    computed: {
      show: {
        get() {
          return this.$store.getters.getOpenState('emoji');
        },
        set(val) {
          this.$store.commit("setIsOpen", ["emoji", val])
        }
      }
    },
    methods: {
      selectEmoji(em) {
        this.$store.commit('setFormatEvent', ['insertText', em]);
      },
      selectGroup(name) {
        this.selectedGroup = name;
      }
    }
  }
</script>