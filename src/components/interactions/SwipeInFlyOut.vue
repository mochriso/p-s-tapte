<template lang="html">
    <div :style="styles" :class="{ 'swiper-dir': !isOpposingDir }">
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
      isOpposingDir: '',
      offset: '',
      translateFrom: '',
      translateIncrement: 0,
      show: false,
      slideChange: '',
      intSwiperTranslate: 0,
      intSwiperTransition: 0,
      direction: this.animation.direction,
      intState: 'idleStart',
      // styles: {
      //   left: '100vw',
      //   transform: '',
      //   transition: '',
      // },
    //  showAnim: false,
    };
  },
  computed: {
    visible() {
      const obj = {};
      if (this.show) {
        obj.visibility = 'visible';
      }
      else {
        obj.visibility = 'hidden';
      }
      return obj;
    },
    localTranslate() {
        return (this.translateIncrement + this.offset);
    },
    localTranslate2x() {
      return ((this.translateIncrement * 2) + (this.offset * 2));
    },
    styles() {
      const obj = {};
      // TRANSITION CALCULATIONS & STYLE//
      const swiperTransition = this.intSwiperTransition;
      const transitionStyle = 'all ' + swiperTransition + 'ms' + ' ease-out';

      const translateValue = this.localTranslate;
      const translate2xValue = this.localTranslate2x;
      const translateStyle = ('translateX(' + translateValue + 'px)');
      const translateStyle2x = ('translateX(' + translate2xValue + 'px)');

  //     // TRANSLATE CALCULATIONS //
  //     const swiperTranslate = this.intSwiperTranslate;
  //     const swiperTranslate2x = (swiperTranslate * 2);
  //     const swiperTranslateReversed = (~swiperTranslate + 1);
  //     const swiperTranslateReversed2x = (swiperTranslateReversed * 2);
  //     // OFFSET CALCULATIONS //
  //     const bWindow = window.innerWidth;
  //     const offsetValue = (this.interactionIndex + 1);
  //     const rightOffset = (bWindow * offsetValue);
  //     const leftOffset = (-bWindow * offsetValue);
  //     // LEFT TO RIGHT CALCULATIONS //
  //     const translateopposingDir = (swiperTranslateReversed + leftOffset);
  //     const translateopposingDir2x = (swiperTranslateReversed2x + (leftOffset * 2));
  //     //  const translateopposingDir = ((swiperTranslateReversed2x) - (leftOffset * 3));
  //     // RIGHT TO LEFT CALCULATIONS //
  //     const translateswiperDir = (swiperTranslate + rightOffset);
  //     const translateswiperDir2x = (swiperTranslate2x + (rightOffset * 2));
  //
  // // LEFT TO RIGHT STYLES //
  //     const opposingDirTranslateStyle = ('translateX(' + translateopposingDir + 'px)');
  //     const opposingDirIdleStart = 'translateX(' + leftOffset + 'px)';
  //     const opposingDirIdleEnd = ('translateX(' + rightOffset + 'px)');
  //       //  console.log('opposingDirIdleStart', opposingDirIdleStart);
  //
  //     const opposingDirTranslateStyle2x = ('translateX(' + translateopposingDir2x + 'px)');
  //     const opposingDirIdleStart2x = opposingDirTranslateStyle2x;
  //     const opposingDirIdleEnd2x = ('translateX(' + (rightOffset * 2) + 'px)');
  //
  // // RIGHT TO LEFT STYLES //
  //     const swiperDirTranslateStyle = ('translateX(' + translateswiperDir + 'px)');
  //     const swiperDirIdleStart = ('translateX(' + rightOffset + 'px)');
  //     const swiperDirIdleEnd = 'translateX(' + leftOffset + 'px)';
  //     // console.log('swiperDirIdleEnd', swiperDirIdleEnd);
  //
  //     const swiperDirTranslateStyle2x = ('translateX(' + translateswiperDir2x + 'px)');
  //     const swiperDirIdleStart2x = ('translateX(' + (rightOffset * 2) + 'px)');
  //     const swiperDirIdleEnd2x = 'translateX(' + (leftOffset * 2) + ')';

  // SETTING THE STYLES //
      const setRightStyle = (translate) => {
        switch (this.intState) {
          case 'idleStart':
          case 'translateFromEnd':
          case 'translating':
          case 'translateFromStart':
          case 'idleEnd':
          obj.transform = translate;
          break;
          case 'transitionToStart':
          case 'transitionToEnd':
            obj.transform = translate;
            obj.transition = transitionStyle;
          break;
          case 'transitioning':
            obj.transition = transitionStyle;
          break;
          default:
            obj.transform = translate;
        }

        // const idleStart = () => {
        //   obj.transform = translate;
        // };
        // const idleEnd = () => {
        //   obj.transform = translate;
        // };
        //
        // const translating = () => {
        //   if (this.direction === 'swiperDir') {
        //     obj.transform = translate;
        //   }
        //   else if (this.direction === 'opposingDir') {
        //     obj.transform = translate;
        //   }
        // };
        // const transitionToEnd = () => {
        //   obj.transform = translate;
        //   obj.transition = transitionStyle;
        //   // console.log(obj);
        // };
        // const transitionToStart = () => {
        //   obj.transform = translate;
        //   obj.transition = transitionStyle;
        // };
        // const transitioning = () => {
        //   //  obj.transform = translate;
        //     obj.transition = transitionStyle;
        // };
        // const intStateArr = [
        //   idleStart,
        //   idleEnd,
        //   translating,
        //   transitioning,
        //   transitionToEnd,
        //   transitionToStart];
        //
        // for (let i = 0; i < intStateArr.length; i += 1) {
        //   if (intStateArr[i].name === this.intState) {
        //     obj = {};
        //     intStateArr[i]();
        //      // console.log(statesArr[i].name, this.state);
        //     //   console.log(obj);
        //   }
        // }
      };

        setRightStyle(translateStyle);
      // testing //
      if ((this.interactionIndex === 0 ||
          this.interactionIndex === 1 ||
          this.interactionIndex === 2) &&
          this.mainSlideIndex === 7) {
  //    console.log('interaction' + this.interactionIndex, obj);
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
    intSwiperTranslate(newVal, oldVal) {
      if (this.direction === 'opposingDir') {
        this.isOpposingDir = true;
        if (newVal > oldVal) {
          this.translateIncrement -= (newVal - oldVal);
        }
        else if (newVal < oldVal) {
          this.translateIncrement += (oldVal - newVal);
        }
      }
      else if (this.direction === 'swiperDir') {
        this.isOpposingDir = false;
        if (newVal < oldVal) {
          this.translateIncrement -= (oldVal - newVal);
        }
        else if (newVal > oldVal) {
          this.translateIncrement += (newVal - oldVal);
        }
      }
    },
//    intSwiperTransition() {
//      if (true) {
//
//      }
//  },
    intActiveIndex: {
    //  immediate: true,
      handler(newVal, oldVal) {
        this.setOffset();
  //  console.log('intActiveIndex', newVal, 'interactionIndex', this.interactionIndex);
        // slidechange direction status (string, relative to this component)
        let upDown;
        if (newVal > oldVal) {
          upDown = 'up';
        }
        else {
          upDown = 'down';
          }
        // set Show value & set slideChange value
        if (newVal === this.interactionIndex) {
          this.slideChange = upDown + 'ToThis';
          this.show = true;
          this.intState = 'transitionToStart';
        }
        else if (newVal === (this.interactionIndex - 1)) {
          this.slideChange = upDown + 'ToPrev';
          this.show = true;
          this.intState = 'transitionToStart';
        }
        else if (newVal === (this.interactionIndex + 1)) {
          this.slideChange = upDown + 'ToNext';
          this.show = true;
          this.intState = 'transitionToEnd';
        }
        else if (newVal < (this.interactionIndex - 1)) {
          this.slideChange = upDown + 'ToBeyondPrev';
          this.show = false;
          this.intState = 'idleStart';
        }
        else if (newVal > (this.interactionIndex + 1)) {
          this.slideChange = upDown + 'ToBeyondNext';
          this.show = false;
          this.intState = 'idleEnd';
        }
        else {
          this.show = false;
        }
      },
    },
    slideChange(newVal) {
      this.emitSlideChange(newVal);
    },
    intState(newVal, oldVal) {
      this.emitIntState(newVal);
    },
  },
  methods: {
    // --- INTERACTION CALLBACKS --- //
    fadeToBlack() {
      const blackBox = document.createElement('div');
      blackBox.className = 'black-fader';
      const theTagAfter = document.querySelector('.');
    },
    setOffset() {
      console.log('setOffset fired');
      const intState = this.intState;

      const swiperDir = (this.direction === 'swiperDir');
      const opposingDir = (this.direction === 'opposingDir');

      const bWindow = window.innerWidth;
      const offsetValue = (this.interactionIndex + 1);
      const swiperDirStartOffset = (bWindow * offsetValue);
      const opposingDirStartOffset = (-bWindow * offsetValue);
      const swiperDirEndOffset = (swiperDirStartOffset - bWindow);
      const opposingDirEndOffset = (opposingDirStartOffset + bWindow);

      const offsetsOnIntstates = (startOffset, endOffset) => {
        switch (this.intState) {
          case 'translateFromStart':
            if (this.intActiveIndex <= this.interactionIndex) {
              this.offset = startOffset;
            }
            else if (this.intActiveIndex > this.interactionIndex) {
              this.offset = endOffset;
            }
          break;
          case 'translateFromEnd':
            if (this.intActiveIndex >= this.interactionIndex) {
              this.offset = endOffset;
            }
            else if (this.intActiveIndex < this.interactionIndex) {
              this.offset = startOffset;
            }
          break;
          case 'idleStart':
          case 'translating':
            this.offset = startOffset;
          break;
          case 'idleEnd':
            this.offset = endOffset;
          break;
          default:
            this.offset = startOffset;
        }
      };

      if (swiperDir) {
        // console.log(swiperDir);
        offsetsOnIntstates(swiperDirStartOffset, swiperDirEndOffset);
      }
      else if (opposingDir) {
        offsetsOnIntstates(opposingDirStartOffset, opposingDirEndOffset);
      }
    },
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
    this.setOffset();
  },
  mounted() {
    let timer;
    const self = this;
    const idleStart = (this.intState === 'idleStart');
    const idleEnd = (this.intState === 'idleEnd');
    this.$nextTick(() => {
      // console.log(this.$parent.$parent.$parent.$refs.interactiveSlider.swiper);
      const parentIntSwiper = this.$parent.$parent.$refs.interactiveSlider.swiper;
    //  console.log('width:' + parentIntSwiper.width, 'height:' + parentIntSwiper.height);
      parentIntSwiper.on('setTranslate', (swiper, translate) => {
        this.intSwiperTranslate = translate;
        // const indexChangePoint = (parentIntSwiper.width / 2);
        // if (self.intState === 'translateFromStart') {
        //   console.log('indexChangePoint', indexChangePoint);
        //   console.log('parentIntSwiper.touches.diff', parentIntSwiper.touches.diff);
        //   if (parentIntSwiper.touches.diff < -indexChangePoint) {
        //     this.setOffset();
        //   }
        // }
        // else if (self.intState === 'translateFromEnd') {
        //   if (parentIntSwiper.touches.diff < indexChangePoint) {
        //     this.setOffset();
        //   }
        // }
        //  console.log('parentIntSwiper.touches.diff', parentIntSwiper.touches.diff);
      //  console.log(this.intSwiperTranslate, translate);
      });
      parentIntSwiper.on('setTransition', (swiper, transition) => {
        this.intSwiperTransition = transition;
      });
      parentIntSwiper.on('touchStart', (swiper, touchStart) => {
        parentIntSwiper.once('setTranslate', () => {
          if (idleStart) {
            self.intState = 'translateFromStart';
          }
          else if (idleEnd) {
            self.intState = 'translateFromEnd';
          }
          else {
            self.intState = 'translating';
          }
        });
      });
      parentIntSwiper.on('touchEnd', (swiper, touchend) => {
      //  console.log('touchend', touchend);
      });
      parentIntSwiper.on('transitionStart', (swiper, transition) => {
        const intActInd = self.intActiveIndex;
        const localInd = self.interactionIndex;
        const localIndMinus1 = (localInd - 1);
        const localIndPlus1 = (localInd + 1);
        const setIntStateTransitions = () => {
          if (intActInd === localInd) {
            this.intState = 'transitionToStart';
          }
          else if (intActInd === localIndMinus1) {
            this.intState = 'transitionToStart';
          }
          else if (intActInd === localIndPlus1) {
            this.intState = 'transitionToEnd';
          }
        };
        timer = setTimeout(setIntStateTransitions, 1);
      });
      parentIntSwiper.on('transitionEnd', (swiper) => {
        clearTimeout(timer);
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
.swiper-dir {
  img {
    transform: scaleX(-1);
  }

}
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
