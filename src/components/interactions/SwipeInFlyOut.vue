<template lang="html">
    <div>
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

export default {
  mixins: [],
  name: 'swipe-in-fly-out',
  props: ['intControllerTranslate', 'animation', 'interactionIndex', 'cycle', 'translateVal', 'movingFwdVal', 'movingBwdVal', 'transitionVal', 'progressVal', 'animatingBwdVal', 'animatingFwdVal'],
  components: { },
  data() {
    return {
      direction: this.animation.direction,
      state: 'idle',
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
      ob.transform = ('translateX' + '(' + this.intControllerTranslate + 'px)');
      return ob;
    },
    SpeedUpTranslate() {
      return (this.translateVal * 2);
    },
    styles() {
      const obj = {};
      const startPosVal = ((this.interactionIndex + 1) * 100) + '%';
      obj.left = startPosVal;
      const start = () => {
      };
      const end = () => {
        obj.transform = ('translateX' + '(' + this.SpeedUpTranslate + 'px)');
      };
      const movingFwd = () => {
        obj.transform = ('translateX' + '(' + this.SpeedUpTranslate + 'px)');
      };
      const movingBwd = () => {
        obj.transform = ('translateX' + '(' + this.SpeedUpTranslate + 'px)');
      };
      const animatingFwd = () => {
        obj.transition = ('all ' + this.transitionVal + 'ms ease-out');
        obj.transform = ('translateX' + '(' + this.SpeedUpTranslate + 'px)');
      };
      const animatingBwd = () => {
        obj.transition = ('all ' + this.transitionVal + 'ms ease-out');
        obj.transform = ('translateX' + '(' + this.SpeedUpTranslate + 'px)');
      };
      const cycleArr = [start, movingFwd, animatingFwd, animatingBwd, end, movingBwd];

      for (let i = 0; i < cycleArr.length; i += 1) {
        if (cycleArr[i].name === this.cycle) {
           cycleArr[i]();
           // console.log(statesArr[i].name, this.state);
          //   console.log(obj);
        }
      }
        // if (this.direction === 'opposite') {
        //   val = 'translateX' + '(' + Math.abs(this.translateVal) + 'px)';
        // }

        // if (this.state === 'ended') {
        //   obj.left = '-80vw';
        //   // obj.transition = '';
        //   // val = '';
        // }
        // else if (this.state === 'leaving') {
        //   console.log(val);
        // }
        // else if (this.state === 'operating') {
        //   val = 'translateX' + '(' + this.translateVal + 'px)';
        // }
        // else if (this.state === 'entering') {
        //   val = 'translateX' + '(' + this.translateVal + 'px)';
        // }
        // else if (this.state === 'idle') {
        //   obj.left = '80vw';
        //   val = 'translateX' + '(' + this.translateVal + 'px)';
        // }
        // obj.transform = val;
       return (obj);
      },
    // transition() {
    //   const val = this.transitionVal + 'ms';
    //   const obj = {};
    //   obj.transitionDuration = val;
    //   return (obj);
    // },
  },
  watch: {
  },
  methods: {
  //   beforeEnter(el) {
  //   this.state = 'idle';
  //   console.log('beforeEnter: idle?', this.state);
  //   },
  //   // the done callback is optional when
  //   // used in combination with CSS
  //   enter(el, done) {
  //     this.state = 'enterDrag';
  //     console.log('enterDrag?', this.state);
  //     this.$on('cycle-animating', () => {
  //     if (this.state === 'enterDrag') {
  //       this.state = 'enterRelease';
  //       console.log('enterRelease?', this.state);
  //     }
  //     });
  //     this.$on('cycle-end', () => {
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
  //     this.$on('cycle-animating', () => {
  //       if (this.state === 'leaveDrag') {
  //         this.state = 'leaveRelease';
  //         console.log('leaveRelease?', this.state);
  //       }
  //     });
  //     this.$on('cycle-start', () => {
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

  },
};
</script>

<style lang="scss">
.interaction-item {
  position: absolute;
  bottom: 0px;
  width: 120%;
  height: 120%;
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
