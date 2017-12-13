<template lang="html">
  <div>
    <swiper :options="intControllerSliderOption" ref="intControllerSlider" class="int-controller-slider">
        <swiper-slide class="slide-int-controller" v-for="(item, index) in sequentialSteps" :key="item.id">
          <template v-if="item.interaction">
            <div>
              <interaction
              :key="item.id"
              :tierIndex="tierIndex"
              :mainActiveIndex="mainActiveIndex"
              :sceneNumber="sceneNumber"
              :animAsset="item.interaction.interactionItem.animAsset"
              :animation="item.interaction.animation"
              ref="interaction">
              </interaction>
            </div>
          </template>
        </swiper-slide>
    </swiper>
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
          :tierName="('t' + addZero(tierIndex))"
          ref="tier">
            <template slot="row" scope="tierProps">
              <row v-for="(item, index) in item.rows"
              :key="item.id"
              :row="item"
              :rowName="(tierProps.tierName + '-r' + index)"
              :sceneNumber="tierProps.sceneNumber"
              :stepIndex="tierProps.stepIndex">
                <template slot="panel" scope="rowProps">
                  <panel v-for="(item, index) in item.panels"
                  :intActiveIndex="intActiveIndex"
                  :key="item.id"
                  :panel="item"
                  :type="item.type"
                  :panelName="(rowProps.rowName + '-p' + index)"
                  :sceneNumber="rowProps.sceneNumber"
                  :stepIndex="rowProps.stepIndex"
                  ref="panel">
                  </panel>
                </template>
              </row>
            </template>
          </tier>
        </swiper-slide>
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
      InteractionCoordinates: [],
      slideIndex: '',
      progressVal: '',
      intActiveIndex: 0,
      intControllerActiveIndex: 0,
      intControllerSliderOption: {
        notNextTick: true,
        nested: true,
        spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: false,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        autoplay: false,
      },
      interactiveSliderOption: {
        notNextTick: true,
        nested: true,
        virtualTranslate: false,
        effect: 'fade',
        speed: 0,
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
        this.$emit('is-main-active-slide', this.slideIndex);
      }
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
    intControllerSwiper() {
      return this.$refs.intControllerSlider.swiper;
    },
  },
  methods: {
    setIntActiveIndex() {
      this.intActiveIndex = this.intSwiper.activeIndex;
    },
    setIntControllerActiveIndex() {
      this.intControllerActiveIndex = this.intControllerSwiper.activeIndex;
    },
  },
  created() {
  },
  mounted() {
    const intControllerSwiper = this.intControllerSwiper;
    const interactiveSwiper = this.intSwiper;
    const self = this;
    this.setIntActiveIndex();
    this.setIntControllerActiveIndex();
    IntEventbus.$emit('the-active-step', self.intActiveIndex);

    interactiveSwiper.lockSwipes();
    intControllerSwiper.on('transitionStart', () => {
      if (intControllerSwiper.activeIndex > self.intControllerActiveIndex) {
        interactiveSwiper.unlockSwipes();
        interactiveSwiper.slideNext(false, 0);
        self.setIntControllerActiveIndex();
        this.setIntActiveIndex();
        interactiveSwiper.lockSwipes();
      }
      else if (intControllerSwiper.activeIndex < self.intControllerActiveIndex) {
        interactiveSwiper.unlockSwipes();
        interactiveSwiper.slidePrev(false, 0);
        self.setIntControllerActiveIndex();
        this.setIntActiveIndex();
        interactiveSwiper.lockSwipes();
      }
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

    IntEventbus.$on('panel-coordinates', (panelCoordinates, panelName) => {
      console.log(panelCoordinates, panelName);
      // todo: create object inside InteractionCoordinates array
    });

    interactiveSwiper.on('transitionEnd', (swiper, sliderMove) => {
    //  console.log('slide');
    });

    this.$on('is-main-active-slide', (tierIndex) => {
      console.log('interactiveSlide component: is main active slide', tierIndex);
      // EMIT TOUCH EVENTS
      interactiveSwiper.on('transitionEnd', (swiper) => {
          MainEventbus.$emit('int-transitionEnd', swiper);
        //  console.log('int-transitionEnd', swiper);
      });

      interactiveSwiper.on('reachEnd', (swiper) => {
        IntEventbus.$emit('int-reachEnd');
         // swiper.slideTo(0, 0, false);
        //  swiper.update(true);
        //  swiper.updateProgress();
      });
      interactiveSwiper.on('sliderMove', (swiper, sliderMove) => {
        IntEventbus.$emit('int-sliderMove', sliderMove);
      });
      interactiveSwiper.on('reachBeginning', (swiper) => {
        IntEventbus.$emit('int-reachBeginning', swiper);
      });
      interactiveSwiper.on('setTranslate', (swiper, translate) => {
          IntEventbus.$emit('int-setTranslate', translate);
        //  console.log('int-translate', swiper, translate);
      });
      interactiveSwiper.on('transitionStart', (swiper) => {
          IntEventbus.$emit('int-transitionStart');
      });
      interactiveSwiper.on('setTransition', (swiper, transition) => {
          IntEventbus.$emit('int-setTransition', transition);
      });

      interactiveSwiper.on('progress', (swiper, progress) => {
          this.progressVal = progress;
          IntEventbus.$emit('int-progress', progress);
      });
      // interactiveSwiper.on('touchStart', (swiper, touchstart) => {
      //     IntEventbus.$emit('int-touchStart', touchstart);
      // });
      // interactiveSwiper.on('transitionEnd', (swiper) => {
      //     IntEventbus.$emit('int-transitionEnd', swiper);
      // });

      interactiveSwiper.on('touchEnd', (swiper, touchend) => {
          IntEventbus.$emit('int-touchEnd', touchend);
      });
    });


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
    IntEventbus.$off();
    MainEventbus.$off();
  },
};
</script>

<style lang="scss">
.interactive-slider, .int-controller-slider {
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

.int-controller-slider {
    z-index: 100;
}
</style>
