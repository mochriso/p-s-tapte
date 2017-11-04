<template lang="html">
  <div class="panel" :class="[this.panelName, panel.type]" :style="styler('wrap')">
    <slot></slot>
    <img :class="panel.effect" :style="styler('img')" :src="panelBgArt" :alt="this.panelName">
  </div>

</template>

<script>
// :class="panel.effect"
// 'transform': 'translate('+panel.position+')',
// :style="{ 'min-width': panel.size, 'min-height': panel.size }"
// 'object-position': panel.position
import addTwoZeroes from './mixins';

import panelBgArt from './mixins';

export default {
  mixins: [panelBgArt, addTwoZeroes],
  name: 'panel',
  props: ['panel', 'panelnr', 'panelName', 'type', 'panelArray', 'sceneNumber'],
  data() {
    return {
      styles: [
        {
          animated: {
            img: { 'min-width': this.panel.size },
            wrap: { '': '' },
          },
        },
        {
          static: {
            img: { 'object-position': this.panel.position },
            wrap: { 'flex-grow': this.panel.grow },
          },
        },
      ],
    };
  },
  computed: {

  },
  methods: {
    styler(part) {
      const returnArr = [];
      this.styles.forEach((obj) => {
        const objType = Object.keys(obj)[0];
         if (this.type === objType) {
           returnArr.push(obj[objType][part]);
         }
     });
     return returnArr[0];
    },
    // returns array with all tier objects
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
