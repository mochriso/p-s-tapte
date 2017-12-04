<template lang="html">
<div class="sliding-container">
  <swiper :options="mainSliderOption" ref="mainSlider" class="main-slider" v-for="(item,index) in story" key="item.id">
    <template v-for="(item,index) in story.chapters">
      <template v-for="(scene,index) in item.scenes">
        <swiper-slide class="slide-main" :sceneIndex="scene.number" v-for="(item,index) in scene.tiers" key="item.id">
          <template scope="slideProps">
          <template v-if="item.type === 'interactive'">
              <interactive-slider
              :sceneNumber="('s' + addZero(slideProps.sceneIndex))"
              :sequentialSteps="item.sequentialSteps"
              :tierIndex="index"
              :mainActiveIndex="activeIndex"
              :type="item.type"
              :key="item.id"
              ref="interactiveSlider">
              </interactive-slider>
          </template>
          <template v-else>
            <tier
            :class="[sceneNumber(slideProps.sceneIndex), ('t' + addZero(index)), item.type]"
            :panelArray="panelArray"
            :key="item.id"
            :tier="item"
            :tierIndex="index"
            :mainActiveIndex="activeIndex"
            :type="item.type"
            :rows="item.rows"
            :sceneNumber="sceneNumber(slideProps.sceneIndex)"
            :tierName="('t' + addZero(index))"
            ref="tier">
            </tier>
          </template>
        </template>
          </swiper-slide>
        </template>
      </template>
  </swiper>
</div>
</template>

<script>
//  :animAsset="item.interaction.animAsset" :transform="item.interaction.transform"
//  :animDirection="item.interaction.animDirection"
// :swipername="intSwiper(index)"
import { MainEventbus } from './maineventbus';

import data from './data';

import Interaction from './Interaction';

import InteractiveSlider from './InteractiveSlider';

import Tier from './Tier';

import addZero from './mixins';

import iterate from './mixins';

export default {
  mixins: [addZero, iterate],
  name: 'main-slider',
  props: [],
  components: { Tier, Interaction, InteractiveSlider },
  data() {
    return {
      story: data.story,
      activeIndex: 0,
      activeTierType: '',
      mainSliderOption: {
        // touchMoveStopPropagation: false,
        notNextTick: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        autoplay: false,
        speed: 175,
        // For testing only:
        keyboardControl: true,
      },
    };
  },
  computed: {
    // returns main swiper object
    mainSwiper() {
      return this.$refs.mainSlider[0].swiper;
    },
    // returns array with all tier objects
    tierArray() {
      const allTiers = [];
      this.story.chapters.forEach((obj) => {
        obj.scenes.forEach((o) => {
           o.tiers.forEach((yo) => {
            allTiers.push(yo);
           });
        });
      });
      return allTiers;
    },
    panelArray() {
      const allPanels = [];
//    this.story.chapters.forEach((obj) => {
//      obj.scenes.forEach((sco) => {
//         sco.tiers
      this.tierArray.forEach((to) => {
             to.rows.forEach((ro) => {
               ro.panels.forEach((po) => {
                 allPanels.push(po);
               });
             });
           });
//        });
//      });
      return allPanels;
    },

    // returns the type value of the current active tier, as string
    activeType() {
      const tArr = this.tierArray;
      const aInd = this.activeIndex;
      let theType;
      // console.log(tArr);
      tArr.forEach((obj) => {
          if (tArr.indexOf(obj) === aInd) {
            theType = obj.type;
          }
        });
      return theType;
    },
    // returns array of all interactive tiers as DATA OBJECTS
    intTierArray() {
       const tArr = this.tierArray;
       const allInt = [];
         let i;
         for (i = 0; i < tArr.length; i += 1) {
           if (tArr[i].type === 'interactive') {
             allInt.push(tArr[i]);
           }
         }
         // console.log(allInteractives);
        return allInt;
    },
    staticTierArray() {
       const tArr = this.tierArray;
       const allInt = [];
         let i;
         for (i = 0; i < tArr.length; i += 1) {
           if (tArr[i].type === 'static') {
             allInt.push(tArr[i]);
           }
         }
         // console.log(allInteractives);
        return allInt;
    },
    // returns array of all tier type values
    typeArray() {
      const allTypes = [];
      this.tierArray.forEach((ob) => {
      //  ob.type.forEach((bo) => {
          allTypes.push(ob.type);
      //  });
      });
      return allTypes;
    },
  },

  methods: {
    // returns array of the INDEXES of all  tiers of given type
    tTypeIndArr(tType) {
       const tArr = this.tierArray;
       const allOfType = [];
         let i;
         for (i = 0; i < tArr.length; i += 1) {
           if (tArr[i].type === tType) {
             allOfType.push(tArr.indexOf(tArr[i]));
           }
         }
        return allOfType;
    },
    sceneNumber(scInd) {
      return ('s' + this.addZero(scInd));
    },
    tierIndex(sceneInd) {
      const sceneTiers = [];
      this.story.chapters.forEach((obj) => {
        obj.scenes.forEach((o) => {
          if (obj.scenes.indexOf(o) === sceneInd) {
            o.tiers.forEach((yo) => {
             sceneTiers.push(yo);
            });
          }
        });
      });
      return sceneTiers;
    },
    SceneIndex() {
      const scenesArr = [];
      this.story.chapters.forEach((obj) => {
        obj.scenes.forEach((o) => {
          scenesArr.push(o);
        });
      });
      scenesArr.forEach((t) => {

      });
      return scenes;
    },
    // sets the component activeIndex numeric value as equal to the main swiper object activeIndex
    setActiveIndex() {
      this.activeIndex = this.mainSwiper.activeIndex;
    },
    // emitActiveType(val) {
    //     // const self = this;
    //     MainEventbus.$emit('the-active-tier-type', this.getActiveType(val));
    //     console.log('emitting active type', this.getActiveType(val));
    // },

    // emitInteractiveIndex() {
    //      MainEventbus.$emit('interactive-slider-index', this.interactiveIndArr());
    //      // console.log('emitting interactive index', this.getInteractiveIndex());
    // },

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.setActiveIndex();
    const self = this;


    // returns an OBJECT with all interactive tier indexes as numeric keys
    // and their respective sub-sliders' swiper objects as values
    function pushIntSlideIndex() {
      const sliders = self.$refs.interactiveSlider;
      const indexes = self.tTypeIndArr('interactive');
      for (let i = 0; i < sliders.length; i += 1) {
         sliders[i].slideIndex = indexes[i];
      }
    }
    pushIntSlideIndex();

    function pushStaticSlideIndex() {
      const sliders = self.$refs.tier;
      const indexes = self.tTypeIndArr('static');
      for (let i = 0; i < sliders.length; i += 1) {
         sliders[i].slideIndex = indexes[i];
      }
    }
    pushStaticSlideIndex();

   console.log(self.tTypeIndArr('interactive'));

//     console.log(this.typeArray);
//     const allIntIndexes = [];
//     this.typeArray.forEach((no) => {
//       if (no === 'interactive') {
//         allIntIndexes.push(this.typeArray.indexOf(no));
//       }
//     });
// console.log('allIntIndexes', allIntIndexes);

  //  console.log(this.mainSwiper.slides[7]);
    // const self = this;
    //   const swActiveIndex = () => {
    //      return self.mainSwiper.activeIndex;
    //    };
    //  this.mainSwiper.on('Progress', (swiper, progress) => {
    //    // this.activeIndex = this.mainSwiper.activeIndex;
    // console.log('Progress', progress);
    // });
  //   this.mainSwiper.on('slideChangeEnd', (swiper) => {
  //     this.activeIndex = this.mainSwiper.activeIndex;
  // console.log('slideChangeEnd', 'data active index:', this.activeIndex,
  // 'swiper active index:', this.mainSwiper.activeIndex);
  //  });

// EXPERIMENT: SET activeIndex THROUGH setTranslate
   self.mainSwiper.on('transitionStart', () => {
     if (self.mainSwiper.activeIndex !== self.activeIndex) {
       self.setActiveIndex();
       MainEventbus.$emit('the-active-tier', self.activeType, self.activeIndex);
     }
   });
// TIMING FUNCTIONS AND TOUCH EVENTS TO SET aI AND PROPERLY CHECK IF aI HAS changed
   let theInterval;

//    function clearRepeatedCheck() {
//      clearInterval(theInterval);
//    }
//    function isItAnimating(callback) {
//      if (self.mainSwiper.animating) {
//          console.log('still moving');
//       }
//       else {
//         self.setActiveIndex();
//         MainEventbus.$emit('the-active-tier', self.activeType, self.activeIndex);
// // console.log('touchEnd', 'data active index:', self.activeIndex, 'swiper active index:',
// // self.mainSwiper.activeIndex, 'emmiting type', self.activeType);
//         clearRepeatedCheck();
//       }
//     }
//     function repeatedCheck() {
//       theInterval = setInterval(isItAnimating, 50);
//     }
//    this.mainSwiper.on('touchEnd', (swiper) => {
//      repeatedCheck();
//    });
//    this.mainSwiper.on('touchStart', (swiper) => {
//      clearRepeatedCheck();
//    });

// TOGGLE MAINSLIDER LOCK ON SPECIAL INTERACTIVITY

    MainEventbus.$on('the-active-tier', (tierType, tierIndex) => {
      console.log(tierType, tierIndex);
       if (tierType === 'interactive') {
      //  this.mainSwiper.lockSwipes();
    //    this.mainSwiper.off('touchEnd');
      // Object.keys(intSwipersObj).forEach((key) => {
      //   const theSlider = intSwipersObj[key].swiper;
      //   const stringedIndex = tierIndex.toString();
      //   // console.log(stringedIndex);
      //   // console.log('hello interactive', theSlider.swiper);
      //   if (stringedIndex === key) {
      //     console.log(stringedIndex, key);
      //     console.log('the slider swiper', theSlider);
      //   }
      // });

        // console.log(this.mainSwiper.touches.currentX);
      }
    });

    this.mainSwiper.on('SetTranslate', (swiper, translate) => {
      // console.log(translate);
    });
// PROPERLY NAME INTERACTIVE NESTED SWIPER INSTANCE
    // const intIndexArray = [];
    // MainEventbus.$on('every-tier-type', (tierIndex, tierType) => {
    //   if (tierType === 'interactive') {
    //     intIndexArray.push(tierIndex);
    //   }
    //   console.log(intIndexArray);
    // });
  },
  updated() {
  },
  beforeDestroy() {
    MainEventbus.$off();
  },
};
</script>

<style lang="scss">
.sliding-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.main-slider {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow:hidden;
  z-index: 30;
  .swiper-slide-prev, .swiper-slide-next  {
    .tier {
      opacity: 0.6;
    }
  }
  // .swiper-slide-prev {
  //   right: -3.5%;
  // }
  // .swiper-slide-next {
  //   left: -3.5%;
  // }

  .slide-main {
    width: 100%;
    margin-left: -1.75%;
    margin-right: -1.75%;

  }
}


</style>
