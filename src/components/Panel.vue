<template lang="html">
  <div class="panel"
  :class="[this.panelName, panel.type]"
  :style="styler('wrap')">
    <slot></slot>
    <template>
      <img
      :class="[panel.effect, playPause]"
      :style="styler('img')"
      :src="swapped ? swappedPanelArt : panelArt"
      :alt="this.panelName">
    </template>
  </div>

</template>

<script>
// :class="panel.effect"
// 'transform': 'translate('+panel.position+')',
// :style="{ 'min-width': panel.size, 'min-height': panel.size }"
// 'object-position': panel.position
import addTwoZeroes from './mixins';

import toggleSwapContextArt from './mixins';

import panelArt from './mixins';

import swappedPanelArt from './mixins';

import { IntEventbus } from './inteventbus';

export default {
  mixins: [toggleSwapContextArt, panelArt, swappedPanelArt, addTwoZeroes],
  name: 'panel',
  props: ['intActiveIndex', 'panel', 'panelnr', 'panelName', 'type', 'panelArray', 'sceneNumber', 'mainActiveIndex', 'slideIndex'],
  data() {
    return {
      isActiveIndex: false,
      isAnimated: this.verifyAnimated(),
      swapped: false,
      coordinates: {
        objectHeight: '',
        objectWidth: '',
    //    objectPositionX: '',
        objectPositionY: '',
      },
      styles: [
        {
          animated: {
            img: {
              'min-width': this.panel.size,
              'object-position': this.panel.position,
            },
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
    playPause() {
      if (this.isAnimated) {
        return {
          'animation-running': this.isActiveIndex,
          'animation-paused': !this.isActiveIndex,
        };
      }
    },
  },
  watch: {
    mainActiveIndex: {
      immediate: true,
      handler(newVal) {
        if (this.slideIndex === newVal) {
          this.isActiveIndex = true;
          if (this.panel.interactionContext) {
              this.setEmitCoordinates();
          }
        }
        else {
          this.isActiveIndex = false;
        }
      },
    },
  },
  methods: {
    verifyAnimated() {
      if (this.panel.type === 'animated') {
        return true;
      }
      return false;
    },
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
    setEmitCoordinates() {
      const objectPosition = this.$el.getBoundingClientRect();
      this.coordinates.objectHeight = objectPosition.height;
      this.coordinates.objectWidth = objectPosition.width;
    //  self.coordinates.objectPositionX = objectPosition.left;
      this.coordinates.objectPositionY = objectPosition.top;
      IntEventbus.$emit(('panel-coordinates'), this.coordinates, this.panel.interactionStep, this.slideIndex, this.panelName);
// console.log('sending coordinates', 'this.coordinates:' + this.coordinates,
// 'this.panel.interactionStep:' + this.panel.interactionStep,
// 'this.slideIndex:' + this.slideIndex, 'this.panelName:' + this.panelName);
    },
  },
  created() {
    IntEventbus.$on('int-slide-change', (val, interactionIndex, SlideIndex) => {
      if (SlideIndex === this.slideIndex) {
        if (this.panel.interactionStep === interactionIndex) {
//      console.log('recieved int-slide-change', val, interactionIndex, SlideIndex);
          if (val === 'upToNext') {
            this.swapped = true;
          }
          else if (val === 'downToThis') {
            this.swapped = false;
          }
        }
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      if (this.panel.interactionContext) {
// console.log('this.panel.interactionContext', this.panel.interactionContext);
// console.log('this.slideIndex === this.mainActiveIndex',
// this.slideIndex === this.mainActiveIndex);
        this.setEmitCoordinates();
      }
    });
  },
  beforeDestroy() {
    IntEventbus.$off();
  },
};
</script>

<style scoped lang="scss">
.panel {
  transform-style: preserve-3d;
//  transform: translate3d(0,0,0);
  backface-visibility: hidden;
  // transform: translateZ(0);
}
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
    will-change: transform;
    transform: translate3d(0,0,0);
  //  transform-style: preserve-3d;
  //  backface-visibility: hidden;
    flex: 1 1 auto;
    align-items: center;
    width: 100%;
    height: auto;
    margin: auto;
  //  object-fit: cover;

  //  align-items: stretch;
  }
  //--- SIMPLE PANEL ANIMS ---//
  .rotate-loop {
    transition-property: transform;
    animation-name: rotation;
    animation-duration: 100s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes rotation {
    from { transform: translate(-32%, -30%) rotate(0deg); }
      to { transform: translate(-32%, -30%) rotate(360deg); }
      // transform: translate(-32%, -30%)
      // scale(212%)
  }
  .zoom-out-loop {
    transition-property: transform;
    animation-name: zoom-out;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-out;
  }
  .zoom-out-once {
    transition-property: transform;
    animation-name: zoom-out;
    animation-duration: 6s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes zoom-out {
    from { transform: translate(-0%, 70%)  scale(2.7, 2.7); }
      to { transform: translate(-0%, 5%)  scale(0.6, 0.6); }
      // transform: translate(-32%, -30%)
      // scale(212%)
  }
  //--- PAUSE/RESUME ANIMATION (NOT TRANSITIONS!) ---//
  .animation-paused {
    animation-play-state: paused;
  }
  .animation-running {
    animation-play-state: running;
  }
}
</style>
