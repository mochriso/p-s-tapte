<template lang="html">
  <component :is="activeComponent" v-if="nextInt" :interactionIndex="interactionIndex" :nextInteraction.sync="nextInteraction" :translateVal="eventVals.translateVal" :transitionVal="eventVals.transitionVal" :progressVal="eventVals.progressVal" :cycle="eventVals.cycle" :animation="this.animation" class="touch-behaviour" :class="this.type">
    <interaction-item :animAsset="this.interactionItem.animAsset">
    </interaction-item>
  </component>
</template>

<script>
import { Eventbus } from './eventbus';

import { Translatebus } from './translatebus';

import InteractionItem from './InteractionItem';

import SwipeInFlyOut from './interactions/SwipeInFlyOut';

export default {
  name: 'interaction',
  components: {
    InteractionItem,
    SwipeInFlyOut,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    interactionIndex: {
      type: Number,
      required: true,
    },
    tierIndex: {
      type: Number,
      required: true,
    },
    interactionItem: {
      type: Object,
    },
    animation: {
      type: Object,
    },
  },
  data() {
    return {
      activeComponent: this.type,
      nextInteraction: 0,
      eventVals: {
        beginningReached: true,
        endReached: false,
        translateVal: '',
        transitionVal: '',
        progressVal: '',
      //  touchStart: false,
      //  touchMove: false,
    //    touchEnd: false,
        cycle: 'start',
      },
    };
  },
  computed: {
    nextInt() {
      if (this.interactionIndex === this.nextInteraction) {
        return true;
      }
    },
  },
  created() {
    // function Eventbroker(emitRef, emittedVal, localVal) {
    //   Eventbus.$on(emitRef, (tierIndex) => {
    //     if (tierIndex === this.activeIndex) {
    //       this.eventVals.localVal = emittedVal;
    //     }
    //     console.log('[emittedVal]', this.eventVals.localVal, emittedVal);
    //   });
    // }
    //
    // Eventbroker('int-translate', translate, translateVal);
        Eventbus.$on('int-reachBeginning', (tierIndex) => {
          this.eventVals.beginningReached = true;
          this.eventVals.endReached = false;
        });
        Eventbus.$on('int-reachEnd', (tierIndex) => {
          this.eventVals.endReached = true;
          this.eventVals.beginningReached = false;
        });
        Eventbus.$on('int-sliderMove', (sliderMove, tierIndex) => {
          if (this.eventVals.cycle === 'start') {
              this.eventVals.cycle = 'movingFwd';
              console.log('cycle movingFwd?', this.eventVals.cycle);
          }
          else if (this.eventVals.cycle === 'end') {
              this.eventVals.cycle = 'movingBwd';
              console.log('cycle movingBwd?', this.eventVals.cycle);
          }
        });

        Translatebus.$on('int-translate', (translate, tierIndex) => {
        //  console.log('receiving translate', translate);
      //    if (tierIndex === this.tierIndex) {
            this.eventVals.translateVal = translate;
          //  this.eventVals.touchEvent = 'setTranslate';
            // this.intStatus.isStarting = false;
            // this.intStatus.isActive = true;
            // this.intStatus.isEnding = false;
      //   }
        });
        Eventbus.$on('int-transition', (transition, tierIndex) => {
            this.eventVals.transitionVal = transition;
        });
        Eventbus.$on('int-transitionStart', (tierIndex) => {
        });
        Eventbus.$on('int-transitionEnd', (tierIndex) => {
          if (this.eventVals.endReached) {
            this.eventVals.cycle = 'end';
            console.log('cycle End?', this.eventVals.cycle);
          }
          else if (this.eventVals.beginningReached) {
            this.eventVals.cycle = 'start';
            console.log('cycle start?', this.eventVals.cycle);
          }
        });
        Eventbus.$on('int-progress', (progress, tierIndex) => {
        //  console.log('receiving progress', progress);
            this.eventVals.progressVal = progress;
        //    console.log('progressVal', this.eventVals.progressVal);
        });
        Eventbus.$on('int-touchEnd', (touchend, tierIndex) => {
          this.eventVals.cycle = 'animating';
          console.log('cycle animating?', this.eventVals.cycle);
        });
        // Eventbus.$on('int-touchStart', (touchstart, tierIndex) => {
        //     this.eventVals.touchEnd = false;
        //     this.eventVals.touchStart = true;
        // console.log('receiving touchStart', this.eventVals.touchStart,
        // 'touchEnd:', this.eventVals.touchEnd);
        // });

        // Eventbus.$on('int-touchMove', (swiper, touchMove, tierIndex) => {
        //   if (tierIndex === this.tierIndex) {
        //     this.eventVals.touchEvent = 'touchMove';
        //   }
        // });
  },
  beforeDestroy() {
    Eventbus.$off();
  },
};
</script>

<style lang="css">
  .touch-behaviour {
    position: absolute;
    width: 100%;
  }
</style>
