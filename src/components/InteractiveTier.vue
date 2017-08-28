<template lang="html">
  <swiper :options="interactiveSliderOption" ref="interactiveSlider" class="interactive-slider">
    <swiper-slide class="slide-interactive">
    </swiper-slide>
  </swiper>
</template>

<script>
import { Eventbus } from './eventbus';

import addZero from './mixins';

import same from './mixins';

import iterate from './mixins';

export default {
  mixins: [addZero, iterate, same],
  name: 'interactive-tier',
  props: ['tierIndex', 'activeIndex', 'type', 'rows', 'tiernr', 'interactions', 'tierArray'],
  components: { },
  data() {
    return {
      interactiveSliderOption: {
        notNextTick: true,
        nested: true,
        virtualTranslate: true,
        spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: false,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        autoplay: false,
      },
    };
  },
  computed: {
    // returns array of the INDEXES of all interactive tiers
    interactiveIndArr() {
       const tArr = this.tierArray;
       const allInteractives = [];
         let i;
         for (i = 0; i < tArr.length; i += 1) {
           if (tArr[i].type === 'interactive') {
             allInteractives.push(tArr.indexOf(tArr[i]));
           }
         }
        return allInteractives;
    },
    // returns an OBJECT with all interactive tier indexes as numeric keys
    // and their respective sub-sliders' swiper objects as values
    intSwipersObject() {
        const values = this.$refs.interactiveSlider;
        const keys = this.interactiveIndArr;
         const intObj = [];
         const obj = {};
         for (let i = 0; i < values.length; i += 1) {
              obj[keys[i]] = values[i];
              }
         intObj.push(obj);
         return intObj[0];
    },
    // returns an ARRAY with all interactive sub-slider swiper objects
    intSwiper() {
      return this.$refs.interactiveSlider.swiper;
    },
  },
  methods: {

  },
  created() {

  },
  mounted() {
    console.log(this.$refs.interactiveSlider.swiper);
    const intSwipersObj = this.intSwipersObject;
    const interactions = this.interactions;
  //  console.log(interactions);
    //   NO MORE NEED:: SET TIMEOUT IN ORDER TO INCLUDE ALL REF'ED INTERACTIVE SWIPER OBJECTS
    //   (BECAUSE ONLY THE FIRST IS READY ON MOUNTED),
    //   THEN MAKE ALL READY FOR INTERACTION:

        const theSwipa = this.intSwiper;
    //  APPEND AN EMPTY SLIDE IN ORDER TO PROPERLY USE PROGRESS/ SETTRANSLATE VALUES
        theSwipa.appendSlide('<div class="slide-interactive swiper-slide"></div>');

    //   REWIND SWIPER TO START IF END IS REACHED
    //   (END BEING THE APPENDED SLIDE)
    //   UPDATE SWIPER AND PROGRESS
        theSwipa.on('onReachEnd', (swiper) => {
           swiper.slideTo(0, 0, false);
           swiper.update(true);
           swiper.updateProgress();
        });

    // CREATE AND COLLECT TRANSLATE-EMIT FUNCTIONS
      //  const trBindFuncs = [];
          theSwipa.on('setTranslate', (swiper, translate) => {
            Eventbus.$emit('int-translate', translate);
          });
          theSwipa.on('setTransition', (swiper, transition) => {
            Eventbus.$emit('int-transition', transition);
          });
          theSwipa.on('progress', (swiper, progress) => {
            Eventbus.$emit('int-progress', progress);
          });
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
      .tier {}
    }
}
</style>
