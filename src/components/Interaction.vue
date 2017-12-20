<template lang="html">
  <component
  :is="activeComponent"
  v-show="showInt"
  :intControllerTranslate="intControllerTranslate"
  :translateVal="translateVal"
  :movingFwdVal="movingFwdVal"
  :movingBwdVal="movingBwdVal"
  :animatingFwdVal="animatingFwdVal"
  :animatingBwdVal="animatingBwdVal"
  :transitionVal="transitionVal"
  :progressVal="progressVal"
  :cycle="cycle"
  :animation="this.animation"
  class="touch-behaviour"
  :class="this.animation.animEvent"
  :style="intSpaceStyle">
    <interaction-item :sceneNumber="this.sceneNumber" :animAsset="animAsset">
    </interaction-item>
  </component>
</template>

<script>
import { IntEventbus } from './inteventbus';

import { MainEventbus } from './maineventbus';

import InteractionItem from './InteractionItem';

import SwipeInFlyOut from './interactions/SwipeInFlyOut';

import FadeToBlack from './interactions/FadeToBlack';


export default {
  name: 'interaction',
  components: {
    InteractionItem,
    SwipeInFlyOut,
    FadeToBlack,
  },
  props: {
    interactionSpace: {
      type: Object,
      required: false,
    },
    isMainActiveSlide: {
      type: Boolean,
      required: true,
    },
    animation: {
      type: Object,
      required: true,
    },
    interactionIndex: {
      type: Number,
      required: false,
    },
    stepIndex: {
      type: Number,
      required: false,
    },
    slideIndex: {
      required: false,
    },
    mainActiveIndex: {
      type: Number,
    },
    interactionItem: {
      type: Object,
    },
    sceneNumber: {
      type: String,
    },
    animAsset: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      idleStyle: {
        display: 'none',
      },
      intControllerTranslate: '',
      intActiveIndex: 0,
  //    isResponding: false,
  //    sumPlayedInteractions: 0,
      showInt: true,
      activeComponent: this.animation.animEvent,
      beginningReached: true,
      endReached: false,
      animatingFwdVal: '',
      animatingBwdVal: '',
      movingFwdVal: '',
      movingBwdVal: '',
      translateVal: '',
      transitionVal: '',
      isTransitioning: false,
      hasTranisitionEnded: false,
      isTranslating: false,
      progressVal: '',
    //  touchStart: false,
      sliderMove: false,
  //    touchEnd: false,
      cycle: 'start',
    };
  },
  computed: {
    intSpaceStyle() {
      let obj = {};
      const self = this;
     if (this.isMainActiveSlide) {
        obj = self.interactionSpace.style;
        obj.left = (obj.left * (self.interactionIndex + 1)) + 'vw';
      }
      else {
        obj = {};
      }
        // obj.display = 'none';
      return obj;
    },
    // hasNextInteractionIndex() {
    //   if (this.interactionIndex === this.intActiveIndex) {
    //     return true;
    //   }
    //   return false;
    // },
    // hasPreviousInteractionIndex() {
    //   if ((this.interactionIndex + 1) === this.intActiveIndex) {
    //     return true;
    //   }
    //   return false;
    // },
    // isNextInteraction() {
    //   if (this.isMainActiveSlide) {
    //     if (this.hasNextInteractionIndex) {
    //       return true;
    //     }
    //     return false;
    //   }
    //   return false;
    // },
    // isPreviousInteraction() {
    //   if (this.isMainActiveSlide) {
    //     if (this.hasPreviousInteractionIndex) {
    //       return true;
    //     }
    //     return false;
    //   }
    //   return false;
    // },
  },
  methods: {
    intSpaceStyler(val) {
    },
  },
  watch: {
    interactionSpace(newVal, oldVal) {
      if (newVal !== 'undefined') {
        this.intSpaceStyler(newVal);
      }
      else if (oldVal !== 'undefined') {
        this.intSpaceStyler(oldVal);
      }
    },
//     isNextInteraction() {
//       if (this.isNextInteraction) {
//         this.showInt = true;
// //        this.isResponding = true;
//       //  this.$emit('is-active-interaction');
//       }
//       else {
// //        this.isResponding = false;
//       }
//     },
   //  hasTranisitionEnded() {
   //    if (this.hasTranisitionEnded) {
   //      if (this.isNextInteraction) {
   //        this.showInt = true;
   //        this.cycle = 'start';
   //      }
   //      else if (this.isPreviousInteraction) {
   //        this.showInt = true;
   //        this.cycle = 'end';
   //        console.log('cycle End?', this.cycle);
   //      }
   //      else if (this.interactionIndex > this.intActiveIndex) {
   //        this.showInt = false;
   //        this.cycle = 'start';
   //        console.log('cycle start?', this.cycle);
   //      }
   //    }
   //  },
   //  translateVal(newVal, oldVal) {
   //    if (this.sliderMove) {
   //      if (newVal < oldVal) {
   //        this.cycle = 'movingFwd';
   //        this.movingBwdVal = '';
   //        this.movingFwdVal = newVal;
   //      }
   //      else {
   //        this.cycle = 'movingBwd';
   //        this.movingFwdVal = '';
   //        this.movingBwdVal = newVal;
   //      }
   //    }
   //  },
   //  cycle(newVal, oldVal) {
   //  },
   //  isTransitioning() {
   //    if (this.isTransitioning) {
   //     if (this.cycle === 'movingFwd') {
   //       this.cycle = 'animatingFwd';
   //       this.animatingBwdVal = '';
   //       this.animatingFwdVal = this.translateVal;
   //     }
   //     else if (this.cycle === 'movingBwd') {
   //       this.cycle = 'animatingBwd';
   //       this.animatingfwdVal = '';
   //       this.animatingBwdVal = this.translateVal;
   //     }
   //   }
   // },
//    isResponding(val) {
//        this.$emit('is-it-responding', val);
//    },
    // cycle(newVal, oldVal) {
    //   if (this.sliderMove) {
    //     if (oldVal === 'start') {
    //       if (newVal === 'movingBwd') {
    //       //  this.isResponding = false;
    //       }
    // //      else if (newVal === 'movingFwd') {
    // //        if (this.interactionIndex > 0) {
    // //          IntEventbus.$emit('movingFwd-not-first');
    // //        }
    // //      }
    //     }
    //     else if (oldVal === 'end') {
    // //      if (newVal === 'movingBwd') {
    // //      }
    //       if (newVal === 'movingFwd') {
    //     //    this.isResponding = false;
    //       }
    //     }
    //   }
  //  },
    // sumPlayedInteractions(newVal) {
    //   if (newVal === (this.interactionCount)) {
    //     IntEventbus.$emit('interactions-done');
    //   }
    // },
  },
  created() {
    // if (this.cycle === 'start') {
    //     this.cycle = 'movingFwd';
    //     console.log('cycle movingFwd?', this.cycle);
    // }
    // else if (this.cycle === 'end') {
    //     this.cycle = 'movingBwd';
    //     console.log('cycle movingBwd?', this.cycle);
    // }

    // function Eventbroker(emitRef, emittedVal, localVal) {
    //   IntEventbus.$on(emitRef, (tierIndex) => {
    //     if (tierIndex === this.activeIndex) {
    //       this.localVal = emittedVal;
    //     }
    //     console.log('[emittedVal]', this.localVal, emittedVal);
    //   });
    // }
    //

    // Eventbroker('int-translate', translate, translateVal);
    // MainEventbus.$on('int-active-index', (sumPlayedInteractions) => {
    //   if (tierIndex === this.tierIndex) {
    //   }
    //   else {
    //   //  IntEventbus.$off();
    //   }
    // });
    // if (sumPlayedInteractions !== this.interactionIndex) {
    //   // IntEventbus.$off();
    //   this.showInt = false;
    // }
    // else {
    //   this.showInt = true;
    // }
    // IntEventbus.$on('interaction-animating-fwd', () => {
    //   while (this.sumPlayedInteractions < this.interactionCount) {
    //     this.sumPlayedInteractions += 1;
    //   }
    // });
    // IntEventbus.$on('interaction-animating-bwd', () => {
    //   while (this.sumPlayedInteractions > 0) {
    //     this.sumPlayedInteractions -= 1;
    //   }
    // });

    this.$on('is-main-active-slide', () => {
      MainEventbus.$on('int-transitionEnd', (swiper) => {
          this.isTransitioning = false;
          this.hasTranisitionEnded = true;
          this.intActiveIndex = swiper.activeIndex;
      });
    });

    const blockWrongDirection = function fn(sliderData, localVersion) {
      if (this.isPreviousInteraction) {
        if (this.cycle === 'movingFwd') {
          this[localVersion] = '';
        }
        this[localVersion] = sliderData;
      }
      else if (this.isNextInteraction) {
        if (this.cycle === 'movingBwd') {
          this[localVersion] = '';
        }
        this[localVersion] = sliderData;
      }
    };

//    this.$on('is-it-responding', (isResponding) => {
  //    if (isResponding) {
        // IntEventbus.$on('int-reachBeginning', () => {
        //   this.beginningReached = true;
        //   this.endReached = false;
        // });
        // IntEventbus.$on('int-reachEnd', () => {
        //   this.endReached = true;
        //   this.beginningReached = false;
        // });
        // IntEventbus.$on('int-sliderMove', (sliderMove) => {
        //   this.hasTranisitionEnded = false;
        //   this.sliderMove = true;
        // });
        // IntEventbus.$on('int-setTranslate', (translate) => {
        //     this.translateVal = translate;
        //     this.isTranslating = true;
        // });
        // IntEventbus.$on('int-setTransition', (transition) => {
        //     this.transitionVal = transition;
        // });
        // IntEventbus.$on('int-transitionStart', () => {
        //   this.isTransitioning = true;
        // });
        // IntEventbus.$on('int-progress', (progress) => {
        //     this.progressVal = progress;
        // });
        // IntEventbus.$on('int-touchEnd', (touchend) => {
        //   this.hasTranisitionEnded = false;
        //   this.sliderMove = false;
        // });
//      }
//      else {
//        IntEventbus.$off();
//      }
//    });

    this.$on('is-active-interaction', () => {
//      this.isResponding = true;
      console.log('Interaction component', this.interactionIndex, ': is active interaction');
    });
        // IntEventbus.$on('int-touchStart', (touchstart, tierIndex) => {
        //     this.touchEnd = false;
        //     this.touchStart = true;
        // console.log('receiving touchStart', this.touchStart,
        // 'touchEnd:', this.touchEnd);
        // });

        // IntEventbus.$on('int-touchMove', (swiper, touchMove, tierIndex) => {
        //   if (tierIndex === this.tierIndex) {
        //     this.touchEvent = 'touchMove';
        //   }
        // });
  },
  mounted() {
    IntEventbus.$on('controller-translate', (translate) => {
     this.intControllerTranslate = translate;
     console.log('int-translate', translate, this.intControllerTranslate);
    });
  },
  beforeDestroy() {
    IntEventbus.$off();
    MainEventbus.$off();
  },
};
</script>

<style lang="css">
  .touch-behaviour {
    position: absolute;
  }
</style>
