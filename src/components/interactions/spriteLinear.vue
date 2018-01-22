<template lang="html">
  <div :style="styles">
    <slot>
    </slot>
  </div>
</template>

<script>
import { IntEventbus } from '../inteventbus';

export default {
  mixins: [],
  name: 'sprite-linear',
  props: ['mainSlideIndex', 'intActiveIndex', 'isMainActiveSlide', 'animation', 'interactionIndex'],
  components: { },
  data() {
    return {
      intSwiperTranslate: 0,
      intSwiperTransition: 0,
      intState: 'idleStart',
    };
  },
  computed: {

  },
  methods: {
    styles(){
      //
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      const parentIntSwiper = this.$parent.$parent.$refs.interactiveSlider.swiper;
      parentIntSwiper.on('setTranslate', (swiper, translate) => {
        this.intSwiperTranslate = translate;
      });
      parentIntSwiper.on('setTransition', (swiper, transition) => {
        this.intSwiperTransition = transition;
      });
    });
  },
};
</script>

<style lang="scss">
</style>
