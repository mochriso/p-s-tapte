<template lang="html">
  <component :is="activeComponent" v-show="showInt" :nextInteraction.sync="nextInteraction" :eventVals="eventVals" :animation="this.animation" class="touch-behaviour" :class="this.type">
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
        touchEvent: '',
      },
    };
  },
  computed: {
    showInt() {
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
        Eventbus.$on('int-translate', (translate, tierIndex) => {
          if (tierIndex === this.tierIndex) {
            this.eventVals.translateVal = translate;
            console.log('recieving translateVals', tierIndex, this.tierIndex, translate);
          }
        });
        Eventbus.$on('int-transition', (transition, tierIndex) => {
          if (tierIndex === this.tierIndex) {
            this.eventVals.transitionVal = transition;
            console.log('transitionVals', this.eventVals.transitionVal, transition);
          }
        });
        Eventbus.$on('int-progress', (progress, tierIndex) => {
          if (tierIndex === this.tierIndex) {
            this.eventVals.progressVal = progress;
            console.log('progressVals', this.eventVals.progressVal, progress);
          }
        });
        Eventbus.$on('int-touchStart', (event, tierIndex) => {
          if (tierIndex === this.tierIndex) {
            this.eventVals.touchEvent = event;
            console.log('touchEvent', this.eventVals.touchEvent, event);
          }
        });
  },

};
</script>

<style lang="css">
  .touch-behaviour {
    position: absolute;
    width: 100%;
  }
</style>
