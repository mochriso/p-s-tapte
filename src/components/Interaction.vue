<template lang="html">
  <component
  :is="activeComponent"
  v-show="showInt"
  :intState.sync="intState"
  :mainSlideIndex="mainSlideIndex"
  :intActiveIndex="intActiveIndex"
  :interactionIndex="interactionIndex"
  :isMainActiveSlide="isMainActiveSlide"
  :translateVal="translateVal"
  :movingFwdVal="movingFwdVal"
  :movingBwdVal="movingBwdVal"
  :animatingFwdVal="animatingFwdVal"
  :animatingBwdVal="animatingBwdVal"
  :transitionVal="transitionVal"
  :progressVal="progressVal"
  :animation="this.animation"
  :class="this.animation.animEvent"
  :style="intSpaceStyle">
    <interaction-item :sceneNumber="this.sceneNumber" :animAsset="animAsset" class="interaction-item">
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
    mainSlideIndex: {
      required: false,
    },
    intSwiper: {
      required: false,
    },
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
    intActiveIndex: {
      type: Number,
      required: true,
    },
    interactionIndex: {
      type: Number,
      required: false,
    },
    interactionStep: {
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
      intState: '',
    };
  },
  computed: {
    hasCallback() {
      if (this.animation.callback) {
        return true;
      }
      return false;
    },
    intSpaceStyle() {
      let obj = {};
     if (this.isMainActiveSlide) {
        obj = this.interactionSpace.style;
      }
      else {
        obj = {};
      }
        // obj.display = 'none';
      return obj;
    },
  },

  methods: {
    // callbacks //
    // callback timing //
    emitCallback(newIntState, oldIntState) {
      const callbacks = this.animation.callback;
      for (let i = 0; i < callbacks.length; i += 1) {
        const cbType = this.animation.callback[i].specs.type;
        const cbTransition = this.animation.callback[i].specs.transition;
        const cbTiming = this.animation.callback[i].timing;
        const cbContext = this.animation.callback[i].context;
        if (cbTiming === newIntState) {
          this.$emit('callback', cbContext, cbType, cbTransition);
        }
      }
    },
  },
  watch: {
    intState(newVal, oldVal) {
      if (this.hasCallback) {
        this.emitCallback(newVal, oldVal);
      }
    },
  },
  created() {
    this.$on('is-active-interaction', () => {
//      this.isResponding = true;
      console.log('Interaction component', this.interactionIndex, ': is active interaction');
    });
  },
  mounted() {
    // animation callback system
    const thisID = this._uid;

    this.$nextTick(() => {
      // console.log(this.$parent.$parent.$parent.$refs.interactiveSlider.swiper);
      const parentIntSwiper = this.$parent.$refs.interactiveSlider.swiper;
  //  console.log('width:' + parentIntSwiper.width, 'height:' + parentIntSwiper.height);
    });
  },
  beforeDestroy() {
    parentIntSwiper.off();
    IntEventbus.$off();
    MainEventbus.$off();
  },
};
</script>

<style lang="css">
</style>
