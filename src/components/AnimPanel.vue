<template lang="html">
  <div class="panel animated" :class="panel.name">
    <img :class="panel.effect" :style="{ 'transform': 'translate('+panel.position+')', 'min-width': panel.size, 'max-width': panel.size }" :src="panelBgArt" :alt="panel.name">
  </div>

</template>

<script>
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

<style lang="scss">
.animated {
  //--- SIMPLE PANEL ANIMS ---//
  .rotate {
    transition-property: transform;
    animation-name: rotate;
    animation-duration: 100s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes rotate {
    from {transform: translate(-32%, -30%) rotate(0deg) ;}
      to {transform: translate(-32%, -30%) rotate(360deg) ;}
  }

}
</style>
