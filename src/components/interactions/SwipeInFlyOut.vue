<template lang="html">
    <div :style="[styles]">
      <slot>
      </slot>
    </div>
</template>

<script>
// v-show="showAnim"
// <transition
// v-on:before-enter="beforeEnter"
// v-on:enter="enter"
// v-on:after-enter="afterEnter"
// v-on:enter-cancelled="enterCancelled"
// v-on:before-leave="beforeLeave"
// v-on:leave="leave"
// v-on:after-leave="afterLeave"
// v-on:leave-cancelled="leaveCancelled"
// :css="false"
// >
//   </transition>

import { IntEventbus } from '../inteventbus';

export default {
  mixins: [],
  name: 'swipe-in-fly-out',
  props: ['mainSlideIndex', 'intActiveIndex', 'isMainActiveSlide', 'animation', 'interactionIndex', 'translateVal', 'movingFwdVal', 'movingBwdVal', 'transitionVal', 'progressVal', 'animatingBwdVal', 'animatingFwdVal'],
  components: { },
  data() {
    return {
      slideChange: '',
      intSwiperTranslate: 0,
      direction: this.animation.direction,
      intState: 'idleStart',
      idleStart: true,
      idleEnd: false,
      // styles: {
      //   left: '100vw',
      //   transform: '',
      //   transition: '',
      // },
    //  showAnim: false,
    };
  },
  computed: {
    translateStyle() {
      const ob = {};
      ob.transform = ('translateX' + '(' + this.intSwiperTranslate + 'px)');
      return ob;
    },
    SpeedUpTranslate() {
      return (this.translateVal * 2);
    },
    styles() {
      let obj = {};
      const swiperTranslate = this.intSwiperTranslate;
      const swiperTranslateReversed = (~swiperTranslate + 1) * 2;
      const bWindow = window.innerWidth;
      const offsetValue = (this.interactionIndex + 1);
      const leftOffset = (bWindow * offsetValue);
      const rightOffset = (-bWindow * offsetValue);
      const translateNormal = (swiperTranslate + leftOffset);
      const transNormRevvedDoubled = ((~translateNormal + 1) * 2);
      const oppositeStartValue = (transNormRevvedDoubled - rightOffset);
      const translateOpposite = ((transNormRevvedDoubled * 2) - (rightOffset * 3));
      console.log('translateOpposite', translateOpposite);
      const normalTranslateStyle = ('translateX(' + translateNormal + 'px)');
      const oppositeTranslateStyle = ('translateX(' + translateOpposite + 'px)');
      const oppositeIdleStart = ('translateX(' + oppositeStartValue + 'px)');
      const oppositeIdleEnd = ('translateX(' + (leftOffset * 2) + 'px)');
      const normalIdleStart = normalTranslateStyle;
      const normalIdleEnd = 'translateX(0)';
    //  console.log(oppositeTranslateStyle, normalTranslateStyle);
      // SETTING THE STYLES //
      const setRightStyle = (translate, start, end) => {
        const idleStart = () => {
          obj.transform = start;
        };
        const idleEnd = () => {
          obj.transform = end;
        };
        const translating = () => {
          if (this.direction === 'normal') {
            obj.transform = translate;
          }
          else if (this.direction === 'opposite') {
            obj.transform = translate;
          }
        };
        const transitioning = () => {
            obj.transform = translate;
        };
        const intStateArr = [idleStart, idleEnd, translating, transitioning];

        for (let i = 0; i < intStateArr.length; i += 1) {
          if (intStateArr[i].name === this.intState) {
            obj = {};
            intStateArr[i]();
             // console.log(statesArr[i].name, this.state);
            //   console.log(obj);
          }
        }
      };

      if (this.direction === 'normal') {
        setRightStyle(normalTranslateStyle, normalIdleStart, normalIdleEnd);
      }
      else if (this.direction === 'opposite') {
        setRightStyle(oppositeTranslateStyle, oppositeIdleStart, oppositeIdleEnd);
      }
      // testing //
      if (this.interactionIndex === 0 && this.mainSlideIndex === 7) {
        console.log('swiperTranslate', swiperTranslate, 'swiperTranslateReversed', swiperTranslateReversed);
        console.log(obj);
      }
      // finished testing//
      return (obj);
    },

    //
    //     // if (this.state === 'ended') {
    //     //   obj.left = '-80vw';
    //     //   // obj.transition = '';
    //     //   // val = '';
    //     // }
    //     // else if (this.state === 'leaving') {
    //     //   console.log(val);
    //     // }
    //     // else if (this.state === 'operating') {
    //     //   val = 'translateX' + '(' + this.translateVal + 'px)';
    //     // }
    //     // else if (this.state === 'entering') {
    //     //   val = 'translateX' + '(' + this.translateVal + 'px)';
    //     // }
    //     // else if (this.state === 'idle') {
    //     //   obj.left = '80vw';
    //     //   val = 'translateX' + '(' + this.translateVal + 'px)';
    //     // }
    //     // obj.transform = val;
    //    return (obj);
    //   },
    // transition() {
    //   const val = this.transitionVal + 'ms';
    //   const obj = {};
    //   obj.transitionDuration = val;
  },
  watch: {
    intActiveIndex(newVal, oldVal) {
      let upDown;
      if (newVal > oldVal) {
        upDown = 'up';
      }
      else {
        upDown = 'down';
        }
      if (newVal === this.interactionIndex) {
        this.slideChange = upDown + 'ToThis';
      }
      else if (newVal === (this.interactionIndex - 1)) {
        this.slideChange = upDown + 'ToPrev';
      }
      else if (newVal === (this.interactionIndex + 1)) {
        this.slideChange = upDown + 'ToNext';
      }
      else if (newVal < (this.interactionIndex - 1)) {
        this.slideChange = upDown + 'ToBeyondPrev';
      }
      else if (newVal > (this.interactionIndex + 1)) {
        this.slideChange = upDown + 'ToBeyondNext';
      }
    },
    slideChange(newVal) {
      this.emitSlideChange(newVal);
    },
    intState(newVal, oldVal) {
      this.emitIntState(newVal);
      if (newVal === 'idleStart') {
        this.idleEnd = false;
        this.idleStart = true;
      }
      else if (newVal === 'idleEnd') {
        this.idleStart = false;
        this.idleEnd = true;
      }
    },
  },
  methods: {
    emitSlideChange(newVal) {
      IntEventbus.$emit('int-slide-change', newVal, this.interactionIndex, this.mainSlideIndex);
    },
    emitIntState(newVal) {
      this.$emit('update:intState', newVal);
    },
  //   beforeEnter(el) {
  //   this.state = 'idle';
  //   console.log('beforeEnter: idle?', this.state);
  //   },
  //   // the done callback is optional when
  //   // used in combination with CSS
  //   enter(el, done) {
  //     this.state = 'enterDrag';
  //     console.log('enterDrag?', this.state);
  //     this.$on('intState-animating', () => {
  //     if (this.state === 'enterDrag') {
  //       this.state = 'enterRelease';
  //       console.log('enterRelease?', this.state);
  //     }
  //     });
  //     this.$on('intState-idleEnd', () => {
  //       done();
  //       console.log('ended youpi');
  //     });
  //   },
  //   afterEnter(el) {
  //   this.state = 'played';
  // //  el.style.transform = 'translateX' + '(' + this.translateVal + 'px)';
  //   console.log('afterEnter: played?', this.state);
  //   },
  //   enterCancelled(el) {
  //   //  this.state = 'idle';
  //   //  el.style.transform = '';
  //     console.log('enter cancelled');
  //   },
  //   // --------
  //   // LEAVING
  //   // --------
  //   beforeLeave(el) {
  //   },
  //   // the done callback is optional when
  //   // used in combination with CSS
  //   leave(el, done) {
  //     this.state = 'leaveDrag';
  //     console.log('leaveDrag?', this.state);
  //     this.$on('intState-animating', () => {
  //       if (this.state === 'leaveDrag') {
  //         this.state = 'leaveRelease';
  //         console.log('leaveRelease?', this.state);
  //       }
  //     });
  //     this.$on('intState-idleStart', () => {
  //       done();
  //     });
  //   //  setTimeout(done, 400);
  //     // must be >= duration value as setTimeout
  // //    el.style.transition = 'all 0.3s ease-out';
  // //    el.style.transform = 'translateX' + '(' + (this.translateVal * 1.5) + 'px)';
  //   //  console.log('leaving', this.state);
  //   },
  //   afterLeave(el) {
  //     this.state = 'idle';
  //     console.log('afterleave: idle?', this.state);
  //   },
  //   // leaveCancelled only available with v-show
  //   leaveCancelled(el) {
  //   //  this.state = 'played';
  //   //  el.style.transform = 'translateX' + '(' + this.translateVal + 'px)';
  //     console.log('leave cancelled');
  //   },
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$parent.$parent.$parent.$refs.interactiveSlider.swiper);
      const parentIntSwiper = this.$parent.$parent.$parent.$parent.$refs.interactiveSlider.swiper;
    //  console.log('width:' + parentIntSwiper.width, 'height:' + parentIntSwiper.height);
      parentIntSwiper.on('setTranslate', (swiper, translate) => {
        this.intSwiperTranslate = translate;
      //  console.log(this.intSwiperTranslate, translate);
      });
      parentIntSwiper.on('transitionStart', (swiper) => {
        this.intState = 'transitioning';
      });
      parentIntSwiper.on('sliderMove', (swiper, touchMove) => {
        parentIntSwiper.once('setTranslate', () => {
          this.intState = 'translating';
        });
      });
      parentIntSwiper.on('transitionEnd', (swiper) => {
         if (this.intActiveIndex <= this.interactionIndex) {
           this.intState = 'idleStart';
         }
         else if (this.intActiveIndex > this.interactionIndex) {
           this.intState = 'idleEnd';
         }
      });
    });
  },
  beforeDestroy() {
    parentIntSwiper.off();
  },
};
</script>

<style lang="scss">
.idle-start {
  left: 105vw;
}
.idle-end {
  left: 0;
}
.interaction-item {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 100%;
}
// .v-enter {
// // transform: translateX(90vw);
// opacity: 0;
// }
// .v-enter-active {
// //  transform: translateX(-50vw);
// transition: opacity 0.01s linear;
// }
// .v-enter-to {
// // transform: translateX(90vw);
// opacity: 1;
// }
// .end-point {
//   right: 90vw;
// }

// .v-leave {
//   transform: translateX(-950px) !important;
// }
// .v-leave-active {
// transition: translateX() 1s ease-out;
// }
// .v-leave-to {
//   transform: translateX(-250px) !important;
// }
</style>
