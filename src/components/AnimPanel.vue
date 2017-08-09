<template lang="html">
  <div class="panel animated" :class="panel.name">
    <img :class="panel.effect" :style="{ 'min-width': panel.size, 'min-height': panel.size }" :src="panelBgArt" :alt="panel.name">
  </div>

</template>

<script>
// :class="panel.effect"
// 'transform': 'translate('+panel.position+')',
// :style="{ 'min-width': panel.size, 'min-height': panel.size }"
import panelBgArt from './mixins';

export default {
  mixins: [panelBgArt],
  name: 'anim-panel',
  props: ['panel', 'panelnr', 'name', 'type', 'effect', 'overlay'],
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {

  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
.animated {
  img {
    flex: 1 1 0;
    align-items: stretch;
    // object-fit: cover;

  //  align-items: stretch;
  }
  //--- SIMPLE PANEL ANIMS ---//
  .rotate {
    transition-property: transform;
    animation-name: rotate;
    animation-duration: 100s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes rotate {
    from { transform: translate(-32%, -30%) rotate(0deg) ;}
      to { transform: translate(-32%, -30%) rotate(360deg) ;}
  }

}
</style>
