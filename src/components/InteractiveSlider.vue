<template lang="html">
    <swiper :options="interactiveSliderOption" ref="interactiveSlider" class="interactive-slider">
        <swiper-slide class="slide-interactive" v-for="(item, index) in sequentialSteps" :key="item.id">
          <tier
          :sceneNumber="sceneNumber"
          :step="item"
          :stepIndex="index"
          :tierIndex="tierIndex"
          :mainActiveIndex="mainActiveIndex"
          :type="type"
          :rows="item.rows"
          :stepName="('st' + index)"
          :tierName="('t' + addZero(tierIndex))">
          </tier>
        </swiper-slide>
    </swiper>
</template>

<script>

import Tier from './Tier';

import { IntEventbus } from './inteventbus';

import { MainEventbus } from './maineventbus';

import addZero from './mixins';

import same from './mixins';

import iterate from './mixins';

export default {
  mixins: [addZero, iterate, same],
  name: 'interactive-slider',
  props: ['tierIndex', 'mainActiveIndex', 'sequentialSteps', 'sceneNumber', 'tierIndex', 'type'],
  components: { Tier },
  data() {
    return {
    //  areInteractionsDone: false,
      progressVal: '',
      interactiveSliderOption: {
        notNextTick: true,
        nested: true,
    //  virtualTranslate: true,
        effect: 'fade',
        speed: 10,
        spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: false,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        autoplay: false,
      },
    };
  },
  watch: {
    isMainActiveSlide() {
      if (this.isMainActiveSlide) {
        this.$emit('is-main-active-slide', this.tierIndex);
      }
    },
  },
  computed: {
    isMainActiveSlide() {
      if (this.mainActiveIndex === this.tierIndex) {
        return true;
      }
      return false;
    },
    // returns array of the INDEXES of all interactive tiers
    // interactiveIndArr() {
    //    const tArr = this.tierArray;
    //    const allInteractives = [];
    //      let i;
    //      for (i = 0; i < tArr.length; i += 1) {
    //        if (tArr[i].type === 'interactive') {
    //          allInteractives.push(tArr.indexOf(tArr[i]));
    //        }
    //      }
    //     return allInteractives;
    // },
    // returns an OBJECT with all interactive tier indexes as numeric keys
    // and their respective sub-sliders' swiper objects as values
    // intSwipersObject() {
    //     const values = this.$refs.interactiveSlider;
    //     const keys = this.interactiveIndArr;
    //      const intObj = [];
    //      const obj = {};
    //      for (let i = 0; i < values.length; i += 1) {
    //           obj[keys[i]] = values[i];
    //           }
    //      intObj.push(obj);
    //      return intObj[0];
    // },
    intSwiper() {
      return this.$refs.interactiveSlider.swiper;
    },
  },
  methods: {

  },
  created() {
  },
  mounted() {
  //  console.log('tierIndex', this.tierIndex);
    const theSwipa = this.intSwiper;
    // theSwipa.appendSlide('<div class="slide-interactive swiper-slide"></div>');
    // IntEventbus.$on('interactions-done', () => {
    //   this.areInteractionsDone = true;
    // //  theSwipa.progress = 1;
    // });
    // const resetSwiper = () => {
    //                     theSwipa.slideTo(0, 0, false);
    //                     theSwipar.update(true);
    //                     };
    // IntEventbus.$on('movingFwd-not-first', () => {
    //         setTimeout(resetSwiper, 10);
    //     });


    this.$on('is-main-active-slide', (tierIndex) => {
      console.log('interactiveSlide component: is main active slide', tierIndex);
      // EMIT TOUCH EVENTS
      theSwipa.on('transitionEnd', (swiper) => {
          MainEventbus.$emit('int-transitionEnd', swiper);
          console.log('int-transitionEnd', swiper);
      });

      theSwipa.on('reachEnd', (swiper) => {
        IntEventbus.$emit('int-reachEnd');
         // swiper.slideTo(0, 0, false);
        //  swiper.update(true);
        //  swiper.updateProgress();
      });
      theSwipa.on('sliderMove', (swiper, sliderMove) => {
        IntEventbus.$emit('int-sliderMove', sliderMove);
      });
      theSwipa.on('reachBeginning', (swiper) => {
        IntEventbus.$emit('int-reachBeginning', swiper);
      });
      theSwipa.on('setTranslate', (swiper, translate) => {
          IntEventbus.$emit('int-setTranslate', translate);
        //  console.log('int-translate', swiper, translate);
      });
      theSwipa.on('transitionStart', (swiper) => {
          IntEventbus.$emit('int-transitionStart');
      });
      theSwipa.on('setTransition', (swiper, transition) => {
          IntEventbus.$emit('int-setTransition', transition);
      });

      theSwipa.on('progress', (swiper, progress) => {
          this.progressVal = progress;
          IntEventbus.$emit('int-progress', progress);
      });
      // theSwipa.on('touchStart', (swiper, touchstart) => {
      //     IntEventbus.$emit('int-touchStart', touchstart);
      // });
      // theSwipa.on('transitionEnd', (swiper) => {
      //     IntEventbus.$emit('int-transitionEnd', swiper);
      // });

      theSwipa.on('touchEnd', (swiper, touchend) => {
          IntEventbus.$emit('int-touchEnd', touchend);
      });
    });


//    theSwipa.on('touchMove', (swiper, touchMove) => {
//        IntEventbus.$emit('int-touchMove', swiper, touchMove);
//    });

      //  trBindFuncs.push(onSetTranslate, onSetTransition, onProgress);

    // CALLBACKS

    // SET PROPER TRANSLATE BINDING FOR EACH INTERACTION AND INITIALISE BINDING FUNCTION
      //   interactions.forEach((e) => {
      // //    console.log(e.translateBind);
      //      const trBind = e.translateBind;
      //      trBindFuncs.forEach((f) => {
      //        if (f.name === trBind) {
      //          f();
      //        }
      //      });
      //   });

    // JUST FOR LOGGING IN CONSOLE
        // theSwipa.on('setTranslate', (swiper, translate) => {
        //   console.log('translate', translate);
        // });
        // theSwipa.on('setTransition', (swiper, transition) => {
        //   console.log('transition', transition);
        // });
        // theSwipa.on('progress', (swiper, progress) => {
        //   console.log('progress', progress);
        // });
  },
  beforeDestroy() {
    IntEventbus.$off();
    MainEventbus.$off();
  },
};
</script>

<style lang="scss">
.interactive-slider {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow:hidden;
  z-index: 50;
  .swiper-slide-prev, .swiper-slide-next  {
    .tier {
      opacity: 1;
    //  padding: 0;
    }
  }
  .swiper-slide-prev {
    right: 0;
  }
  .swiper-slide-next {
    left: 0;
  }
  .swiper-slide-active {
  }
    .slide-interactive {
      width: 100%;
      margin: 0;
      padding: 0;
    }
}
</style>
