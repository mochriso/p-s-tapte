<template lang="html">
<div class="sliding-container">
  <swiper :options="mainSliderOption" ref="mainSlider" class="main-slider" v-for="(item,index) in story" key="item.id">
    <swiper-slide class="slide-main" v-for="(item,index) in tierArray" key="item.id" v-if="item.type=='interactive'">
        <interactive-tier :key="item.id" :name="item.name" :type="item.type" :rows="item.rows" :tiernr="addZero(index+1)">
        </interactive-tier>
      </swiper-slide>
      <swiper-slide class="slide-main" v-else>
        <tier :key="item.id" :name="item.name" :type="item.type" :rows="item.rows" :tiernr="addZero(index+1)">
        </tier>
      </swiper-slide>

  </swiper>

</div>
</template>

<script>
import data from './data';

import InteractiveTier from './InteractiveTier';

import Tier from './Tier';

import addZero from './mixins';


export default {
  mixins: [addZero],
  name: 'main-slider',
  props: [],
  components: { Tier, InteractiveTier },
  data() {
    return {
      story: data.story,
      mainSliderOption: {
        notNextTick: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        autoplay: false,
      },
    };
  },
  computed: {
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
  },
  methods: {

  },
  created() {

  },
  mounted() {

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



</style>
