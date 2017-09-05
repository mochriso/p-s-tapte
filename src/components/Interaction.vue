<template lang="html">
  <component :is="activeComponent" v-if="nextInt" :interactionIndex="interactionIndex" :nextInteraction.sync="nextInteraction" :eventVals="eventVals" :animation="this.animation" class="touch-behaviour" :class="this.type">
    <interaction-item :animAsset="this.interactionItem.animAsset">
    </interaction-item>
  </component>
</template>

<script>
import { Eventbus } from './eventbus';

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
        translateVal: '',
        transitionVal: '',
        progressVal: '',
        touchStart: false,
        touchMove: false,
        touchEnd: false,
        translating: false,
        transitioning: false,
        progressing: false,
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
    console.log('local tierIndex', this.tierIndex);
        Eventbus.$on('int-translate', (swiper, translate, tierIndex) => {
        //  console.log('receiving translate', translate);
      //    if (tierIndex === this.tierIndex) {
            this.eventVals.translateVal = translate;
            this.eventVals.translating = true;
          //  this.eventVals.touchEvent = 'setTranslate';
            // this.intStatus.isStarting = false;
            // this.intStatus.isActive = true;
            // this.intStatus.isEnding = false;
      //   }
        });
        Eventbus.$on('int-transition', (transition, tierIndex) => {
            this.eventVals.transitionVal = transition;
            this.eventVals.transitioning = true;
        });
        // Eventbus.$on('int-transitionStart', (swiper, tierIndex) => {
        //   if (tierIndex === this.tierIndex) {
        //     this.eventVals.touchEvent = 'transitionStart';
        //     // log
        //   }
        // });
        Eventbus.$on('int-transitionEnd', (swiper, tierIndex) => {
            this.eventVals.transitioning = false;
        });
        Eventbus.$on('int-progress', (progress, tierIndex) => {
        //  console.log('receiving progress', progress);
            this.eventVals.progressVal = progress;
            this.eventVals.progressing = true;
        //    console.log('progressVal', this.eventVals.progressVal);
        });
        Eventbus.$on('int-touchEnd', (swiper, touchend, tierIndex) => {
            this.eventVals.touchEnd = true;
          //  this.eventVals.touchStart = false;
            this.eventVals.touchMove = false;
        });
        Eventbus.$on('int-touchStart', (touchstart, tierIndex) => {
            this.eventVals.touchEnd = false;
            this.eventVals.touchStart = true;
            console.log('receiving touchStart', this.eventVals.touchStart, 'touchEnd:', this.eventVals.touchEnd);
        });

        // Eventbus.$on('int-touchMove', (swiper, touchMove, tierIndex) => {
        //   if (tierIndex === this.tierIndex) {
        //     this.eventVals.touchEvent = 'touchMove';
        //   }
        // });
  },

};
</script>

<style lang="css">
  .touch-behaviour {
    position: absolute;
    width: 100%;
  }
</style>
