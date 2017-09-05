<template lang="html">
  <transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
  :css="false"
  >
    <div v-show="showAnim"  :style="styles">
      <slot>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  mixins: [],
  name: 'swipe-in-fly-out',
  props: ['animation', 'interactionIndex', 'eventVals', 'nextInteraction'],
  components: { },
  data() {
    return {
      direction: this.animation.direction,
      state: 'idle',
    };
  },
  computed: {
    classObj() {
      if (this.state !== 'ended' && this.eventVals.progressVal < 0.5) {
        return 'start-point';
      }
      return 'end-point';
    },
    showAnim() {
      console.log(this.eventVals.progressing);
      if (this.eventVals.progressing) {
        if (this.eventVals.progressVal <= 0) {
          return false;
        }
        if (this.eventVals.progressVal >= 1) {
          return false;
        }
        else if (this.eventVals.translating) {
          if (this.eventVals.transitionVal > 0) {
            return false;
          }
          return true;
        }
      }
        return false;
    },
    styles() {
      const obj = {};
        const idle = () => {
      //    console.log('idle');
        };
        const entering = () => {
      //    console.log('entering');
            obj.transform = 'translateX' + '(' + this.eventVals.translateVal + 'px)';
        };
        const operating = () => {
      //    console.log('operating');
            obj.transform = 'translateX' + '(' + this.eventVals.translateVal + 'px)';
        };
        const leaving = () => {
      //    console.log('leaving');
            obj.transform = 'translateX' + '(' + (this.eventVals.translateVal * 2) + 'px)';
            // must be same duration value as setTimeout in the leave() hook
            obj.transition = 'all ' + this.eventVals.transitionVal + 'ms ease-out';
        };
        const ended = () => {
      //    console.log('ended');
        };
        const statesArr = [idle, entering, operating, leaving, ended];

        for (let i = 0; i < statesArr.length; i += 1) {
          console.log(statesArr[i].name, this.state);
          if (statesArr[i].name === this.state) {
             statesArr[i]();
          }
          console.log(obj);
        }

      return obj;
      // if (this.direction === 'opposite') {
      //   val = 'translateX' + '(' + Math.abs(this.eventVals.translateVal) + 'px)';
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
      //   val = 'translateX' + '(' + this.eventVals.translateVal + 'px)';
      // }
      // else if (this.state === 'entering') {
      //   val = 'translateX' + '(' + this.eventVals.translateVal + 'px)';
      // }
      // else if (this.state === 'idle') {
      //   obj.left = '80vw';
      //   val = 'translateX' + '(' + this.eventVals.translateVal + 'px)';
      // }
      // obj.transform = val;
      // return (obj);
    },

    // transition() {
    //   const val = this.eventVals.transitionVal + 'ms';
    //   const obj = {};
    //   obj.transitionDuration = val;
    //   return (obj);
    // },
  },
  methods: {
    // --------
    // ENTERING
    // --------
    beforeEnter(el) {
    //  this.state = 'idle';
    //  console.log('idle');
    },
    // the done callback is optional when
    // used in combination with CSS
    enter(el, done) {
      this.state = 'entering';
    //  this.styles.transform = 'translateX' + '(' + this.eventVals.translateVal + 'px)';
      console.log('entering', this.state);
      // ...
      done();
    },
    afterEnter(el) {
    this.state = 'operating';
  //  el.style.transform = 'translateX' + '(' + this.eventVals.translateVal + 'px)';
    console.log('operating', this.state);
    },
    enterCancelled(el) {
      this.state = 'idle';
    //  el.style.transform = '';
      console.log('enter cancelled');
    },
    // --------
    // LEAVING
    // --------
    beforeLeave(el) {
    },
    // the done callback is optional when
    // used in combination with CSS
    leave(el, done) {
      this.state = 'leaving';
      setTimeout(done, 400);
      // must be >= duration value as setTimeout
  //    el.style.transition = 'all 0.3s ease-out';
  //    el.style.transform = 'translateX' + '(' + (this.eventVals.translateVal * 1.5) + 'px)';
      console.log('leaving', this.state);
    },
    afterLeave(el) {
      this.state = 'ended';
      console.log('ended', this.state);
    },
    // leaveCancelled only available with v-show
    leaveCancelled(el) {
      this.state = 'operating';
    //  el.style.transform = 'translateX' + '(' + this.eventVals.translateVal + 'px)';
      console.log('leave cancelled');
    },
  },
  created() {

  },
  mounted() {
    // console.log(this.styles, this.entering);
  //  console.log(this.interactionIndex, this.nextInteraction);
  },
};
</script>

<style scoped lang="scss">
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
 .start-point {
   left: 100vw;
 }
 .end-point {
   left: -100vw;
 }
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
