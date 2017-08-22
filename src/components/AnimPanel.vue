<template lang="html">
  <div class="panel" :class="[panel.name, panel.type]" :style="(panel.type + 'Wrap')">
    <img :class="panel.effect" :style="(panel.type + 'Img')" :src="panelBgArt" :alt="panel.name">
  </div>

</template>

<script>
// :class="panel.effect"
// 'transform': 'translate('+panel.position+')',
// :style="{ 'min-width': panel.size, 'min-height': panel.size }"
// 'object-position': panel.position
import panelBgArt from './mixins';

export default {
  mixins: [panelBgArt],
  name: 'panel',
  props: ['panel', 'panelnr', 'name', 'type', 'effect', 'overlay'],
  data() {
    return {
      animatedImg: {
         'min-width': panel.size,
      },
      animatedWrap: {
      },
      staticImg: {
         'object-position': panel.position,
      },
      staticWrap: {
         'flex-grow': panel.grow,
      },

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
.static {
  img {
    min-width: 0%;
    min-height: 0%;
    flex: 1 1 0;
    align-items: stretch;
    object-fit: cover;
  }
}
.animated {
  img {
    flex: 1 1 auto;
    align-items: center;
    width: 100%;
    height: auto;
    margin: auto;
  //  object-fit: cover;

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
    from { transform: translate(-32%, -30%)  rotate(0deg); }
      to { transform: translate(-32%, -30%)  rotate(360deg); }
      // transform: translate(-32%, -30%)
      // scale(212%)
  }

}
</style>
