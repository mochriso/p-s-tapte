<template lang="html">
  <div>
    <swiper :options="interactiveSliderOption" ref="interactiveSlider" class="interactive-slider">
        <swiper-slide class="slide-interactive" v-for="(item, index) in sequentialSteps" :key="item.id">
          <template v-if="item.interaction">
              <interaction
              :mainSlideIndex="slideIndex"
              :intActiveIndex="intActiveIndex"
              :interactionIndex="index"
              :isMainActiveSlide="isMainActiveSlide"
              :key="item.id"
              :mainActiveIndex="mainActiveIndex"
              :sceneNumber="sceneNumber"
              :animAsset="item.interaction.interactionItem.animAsset"
              :animation="item.interaction.animation"
              :interactionSpace="interactionSpaces[index]"
              ref="interaction">
              </interaction>
          </template>
        </swiper-slide>
        <swiper-slide />
    </swiper>
  </div>
</template>

<script>
//         :type="item.animation.behaviour"
//        :animation="item.animation"
//        :interactionItem="item.interactionItem"
import Interaction from './Interaction';

import Tier from './Tier';

import Row from './Row';

import Panel from './Panel';

import { IntEventbus } from './inteventbus';

import { MainEventbus } from './maineventbus';

import addZero from './mixins';

import same from './mixins';

import iterate from './mixins';

export default {
  mixins: [addZero, iterate, same],
  name: 'interactive-slider',
  props: ['tierIndex', 'mainActiveIndex', 'sequentialSteps', 'sceneNumber', 'type'],
  components: { Tier, Row, Panel, Interaction },
  data() {
    return {
    //  areInteractionsDone: false,
      intSwiperTranslate: '',
      interactionSpaces: [],
      slideIndex: '',
      progressVal: '',
      intActiveIndex: 0,
      interactiveSliderOption: {
        notNextTick: true,
        nested: true,
        spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        autoplay: false,
      },
    };
  },
  watch: {
    isMainActiveSlide(newVal, oldVal) {
    },
    intActiveIndex() {
      this.emitIntActiveIndex();
    },
  },
  computed: {
    isMainActiveSlide() {
      if (this.mainActiveIndex === this.slideIndex) {
        return true;
      }
      return false;
    },

    intSwiper() {
      return this.$refs.interactiveSlider.swiper;
    },
  },
  methods: {
    setIntSwiperTranslate(translate) {
      this.intSwiperTranslate = translate;
      console.log(this.intSwiperTranslate);
    },
    emitIntActiveIndex() {
      IntEventbus.$emit('int-active-index', this.intActiveIndex, this.slideIndex);
    //  console.log('sending out int-active-index', this.intActiveIndex, this.slideIndex);
    },
    setIntSpaceStyle(tierIndex, objectCoordinates, panelName) {
      this.interactionSpaces.push(
        {
          name: panelName,
          tier: tierIndex,
          style: {
            width: (objectCoordinates.objectWidth + 'px'),
            height: (objectCoordinates.objectHeight + 'px'),
          //  left: 100,
            top: (objectCoordinates.objectPositionY + 'px'),
          },
        },
      );
    //  console.log('this.interactionSpaces:' + this.interactionSpaces);
    },
    setIntActiveIndex() {
      this.intActiveIndex = this.intSwiper.activeIndex;
    },

  },
  created() {
    IntEventbus.$on('panel-coordinates', (panelCoordinates, interactionStep, slideIndex, panelName) => {
//  console.log('recieved coordinates', panelCoordinates, interactionStep, slideIndex, panelName);
        if (this.slideIndex === slideIndex) {
          this.setIntSpaceStyle(slideIndex, panelCoordinates, panelName);
        }
    });
  },
  mounted() {
//    this.$on('int-translate', (translate) => {
//      this.setIntSwiperTranslate(translate);
//    });
    this.$nextTick(() => {
        this.emitIntActiveIndex();
    });


    const interactiveSwiper = this.intSwiper;
    const self = this;
    this.setIntActiveIndex();

    interactiveSwiper.on('transitionStart', () => {
        self.setIntActiveIndex();
      });


    // SET ACTIVEINDEX THROUGH TRANSITIONSTART
       // interactiveSwiper.on('transitionStart', () => {
       //   if (interactiveSwiper.activeIndex !== self.intActiveIndex) {
       //     self.setIntActiveIndex();
       //     IntEventbus.$emit('the-active-step', self.intActiveIndex);
       //     console.log(self.intActiveIndex);
       //   }
       // });

    // interactiveSwiper.appendSlide('<div class="slide-interactive swiper-slide"></div>');
    // IntEventbus.$on('interactions-done', () => {
    //   this.areInteractionsDone = true;
    // //  interactiveSwiper.progress = 1;
    // });
    // const resetSwiper = () => {
    //                     interactiveSwiper.slideTo(0, 0, false);
    //                     interactiveSwiperr.update(true);
    //                     };
    // IntEventbus.$on('movingFwd-not-first', () => {
    //         setTimeout(resetSwiper, 10);
    //     });

    // interactiveSwiper.on('transitionEnd', (swiper, sliderMove) => {
    // //  console.log('slide');
    // });

    // this.$on('is-main-active-slide', (tierIndex) => {
    //   console.log('interactiveSlide component: is main active slide', tierIndex);
    //   // EMIT TOUCH EVENTS
    //   interactiveSwiper.on('transitionEnd', (swiper) => {
    //       MainEventbus.$emit('int-transitionEnd', swiper);
    //     //  console.log('int-transitionEnd', swiper);
    //   });
    //
    //   interactiveSwiper.on('reachEnd', (swiper) => {
    //     IntEventbus.$emit('int-reachEnd');
    //      // swiper.slideTo(0, 0, false);
    //     //  swiper.update(true);
    //     //  swiper.updateProgress();
    //   });
    //   interactiveSwiper.on('sliderMove', (swiper, sliderMove) => {
    //     IntEventbus.$emit('int-sliderMove', sliderMove);
    //   });
    //   interactiveSwiper.on('reachBeginning', (swiper) => {
    //     IntEventbus.$emit('int-reachBeginning', swiper);
    //   });
    //
    //   interactiveSwiper.on('transitionStart', (swiper) => {
    //       IntEventbus.$emit('int-transitionStart');
    //   });
    //   interactiveSwiper.on('setTransition', (swiper, transition) => {
    //       IntEventbus.$emit('int-setTransition', transition);
    //   });
    //
    //   interactiveSwiper.on('progress', (swiper, progress) => {
    //       this.progressVal = progress;
    //       IntEventbus.$emit('int-progress', progress);
    //   });
    //   // interactiveSwiper.on('touchStart', (swiper, touchstart) => {
    //   //     IntEventbus.$emit('int-touchStart', touchstart);
    //   // });
    //   // interactiveSwiper.on('transitionEnd', (swiper) => {
    //   //     IntEventbus.$emit('int-transitionEnd', swiper);
    //   // });
    //
    //   interactiveSwiper.on('touchEnd', (swiper, touchend) => {
    //       IntEventbus.$emit('int-touchEnd', touchend);
    //   });
    // });


//    interactiveSwiper.on('touchMove', (swiper, touchMove) => {
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
        // interactiveSwiper.on('setTranslate', (swiper, translate) => {
        //   console.log('translate', translate);
        // });
        // interactiveSwiper.on('setTransition', (swiper, transition) => {
        //   console.log('transition', transition);
        // });
        // interactiveSwiper.on('progress', (swiper, progress) => {
        //   console.log('progress', progress);
        // });
  },
  beforeDestroy() {
    this.$off();
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
.interactive-slider {
    z-index: 50;
}
</style>
