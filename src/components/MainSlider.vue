<template lang="html">
<div class="sliding-container">
  <swiper :options="mainSliderOption" ref="mainSlider" class="main-slider" v-for="(item,index) in story" key="item.id">
    <swiper-slide class="slide-main" v-for="(item,index) in tierArray" key="item.id">
      <template v-if="item.type === 'interactive'">
        <swiper :options="interactiveSliderOption" ref="interactiveSlider" class="interactive-slider">
          <swiper-slide class="slide-interactive">
            <tier :key="item.id" :activeIndex="activeIndex" :type="item.type" :rows="item.rows" :interactions="item.interactions" :tiernr="addZero(index+1)">
              <template v-for="item in item.interactions">
                <interaction :key="item.id" :gesture="item.gesture" :animContext="item.animContext" :translateBind="item.translateBind"></interaction>
              </template>
            </tier>
          </swiper-slide>
        </swiper>
      </template>
      <template v-else>
        <tier :key="item.id" :index="index" :activeIndex="activeIndex" :type="item.type" :rows="item.rows" :tiernr="addZero(index+1)">
        </tier>
      </template>
      </swiper-slide>
  </swiper>
</div>
</template>

<script>
//  :animAsset="item.interaction.animAsset" :transform="item.interaction.transform"
//  :animDirection="item.interaction.animDirection"
// :swipername="intSwiper(index)"
import { Eventbus } from './eventbus';

import data from './data';

import Interaction from './Interaction';

import Tier from './Tier';

import addZero from './mixins';

import same from './mixins';

import iterate from './mixins';

export default {
  mixins: [addZero, iterate],
  name: 'main-slider',
  props: [],
  components: { Tier, Interaction },
  data() {
    return {
      story: data.story,
      activeIndex: 0,
      activeTierType: '',
      showInt: false,
      mainSliderOption: {
        // touchMoveStopPropagation: false,
        // shortSwipes: false,
        notNextTick: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        autoplay: false,
      },
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
    mainSwiper() {
      return this.$refs.mainSlider[0].swiper;
    },

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
    interactiveIndArr() {
       const tArr = this.tierArray;
       const allInteractives = [];
         let i;
         for (i = 0; i < tArr.length; i += 1) {
           if (tArr[i].type === 'interactive') {
             // console.log(tArr.indexOf(tArr[i]));
             allInteractives.push(tArr.indexOf(tArr[i]));
           }
         }
         // console.log(allInteractives);
        return allInteractives;
    },
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
    typeArray() {
      const allTypes = [];
      this.tierArray.forEach((ob) => {
      //  ob.type.forEach((bo) => {
          allTypes.push(ob.type);
      //  });
      });
      return allTypes;
    },
    intSwipersObject() {
        const values = this.$refs.interactiveSlider;
        const keys = this.interactiveIndArr;
         const intObj = [];
         const obj = {};
         for (let i = 0; i < values.length; i += 1) {
              obj[keys[i]] = values[i];
            //  console.log(values[i].swiper);
              }
         intObj.push(obj);
         return intObj[0];
    },
    intSwipersArray() {
      return this.$refs.interactiveSlider;
    },
  },
  methods: {
    setActiveIndex() {
      this.activeIndex = this.mainSwiper.activeIndex;
    },
    // emitActiveType(val) {
    //     // const self = this;
    //     Eventbus.$emit('the-active-tier-type', this.getActiveType(val));
    //     console.log('emitting active type', this.getActiveType(val));
    // },

    // emitInteractiveIndex() {
    //      Eventbus.$emit('interactive-tier-index', this.interactiveIndArr());
    //      // console.log('emitting interactive index', this.getInteractiveIndex());
    // },

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.setActiveIndex();
    const intSwipersObj = this.intSwipersObject;
    const intSwiperArr = this.intSwipersArray;

    console.log(this.intTierArray);

    function setTrBinding() {
      theSwipa.on('SetTranslate', (swiper, translate) => {
        console.log('translate', translate);
      });
    }

//   SET TIMEOUT IN ORDER TO INCLUDE ALL REF'ED INTERACTIVE SWIPER OBJECTS
//   (BECAUSE ONLY THE FIRST IS READY ON MOUNTED),
//   THEN MAKE ALL READY FOR INTERACTION:
//   1) APPEND AN EMPTY SLIDE IN ORDER TO PROPERLY USE PROGRESS/ SETTRANSLATE VALUES
//   2) REWIND SWIPER TO START IF PROGRESS IS >= 1
//      (IE THE SWIPER HAS REACHED END. END BEING THE APPENDED SLIDE)
//      OBS! PROGRESS DOES NOT REWIND UNTIL AFTER THE N E X T TOUCH END!
    setTimeout(() => {
      intSwiperArr.forEach((el) => {
        const theSwipa = el.swiper;
        theSwipa.appendSlide('<div class="slide-interactive swiper-slide"><div class="tier interactive"><div class="row"><div class="panel"></div></div></div></div>');
        theSwipa.on('touchEnd', (swiper) => {
          if (theSwipa.progress >= 1) {
            theSwipa.slideTo(0, 0, false);
          }
        });
        this.intTierArray.forEach((elm) => {

        });
        theSwipa.on('SetTranslate', (swiper, translate) => {
          console.log('translate', translate);
        });
        theSwipa.on('SetTransition', (swiper, transition) => {
          console.log('transition', transition);
        });
        theSwipa.on('progress', (swiper, progress) => {
          console.log('progress', progress);
        });
      });
    }, 10);

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

// TIMING FUNCTIONS AND TOUCH EVENTS TO SET aI AND PROPERLY CHECK IF aI HAS changed
   const self = this;
   let theInterval;

   function clearRepeatedCheck() {
     clearInterval(theInterval);
   }
   function isItAnimating(callback) {
     if (self.mainSwiper.animating) {
         console.log('still moving');
      }
      else {
        self.setActiveIndex();
        Eventbus.$emit('the-active-tier-type', self.activeType, self.activeIndex);
        console.log('touchEnd', 'data active index:', self.activeIndex, 'swiper active index:', self.mainSwiper.activeIndex, 'emmiting type', self.activeType);
        clearRepeatedCheck();
      }
    }
    function repeatedCheck() {
      theInterval = setInterval(isItAnimating, 50);
    }
   this.mainSwiper.on('touchEnd', (swiper) => {
     repeatedCheck();
   });
   this.mainSwiper.on('touchStart', (swiper) => {
     clearRepeatedCheck();
   });

// TOGGLE MAINSLIDER LOCK ON SPECIAL INTERACTIVITY
// EMIT INDEX & TYPE OF ACTIVE TIER
// SET FUNCTIONS IF INTERACTIVE

    Eventbus.$on('the-active-tier-type', (tierType, tierIndex) => {
      console.log(tierType, tierIndex);
       if (tierType === 'interactive') {
          this.mainSwiper.lockSwipes();
          this.mainSwiper.off('touchEnd');
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
    // Eventbus.$on('every-tier-type', (tierIndex, tierType) => {
    //   if (tierType === 'interactive') {
    //     intIndexArray.push(tierIndex);
    //   }
    //   console.log(intIndexArray);
    // });
  },
  updated() {
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
  height: 96%;
  margin: 0;
  padding: 4% 0 0 0;
  overflow:hidden;
  z-index: 30;
  .swiper-slide-prev, .swiper-slide-next  {
    .tier {
      opacity: 0.6;
    }
  }
  .swiper-slide-prev {
    right: -1.5%;
  }
  .swiper-slide-next {
    left: -1.5%;
  }
  .slide-main {
    width: 97%;
    // margin-left: 0.5%;
    // margin-right: 0.5%;
  }
}

.interactive-slider {
  position: relative;
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
