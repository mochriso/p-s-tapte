<template lang="html">
<div class="interaction-item" :style="styles.wrap">
  <img :src="animAssetArt" alt="">
</div>
</template>

<script>
import animAssetArt from './mixins';

import { Eventbus } from './eventbus';

export default {
  mixins: [animAssetArt],
  name: 'interaction-item',
  props: ['animAsset', 'transform', 'animDirection'],
  data() {
    return {
      translate: '(0px)',
      progress: '0',
      styles: {
        wrap: {
          transitionProperty: 'transform',
          transform: this.animDirection,
        },
        img: {

        },
      },
    };
  },
  computed: {
    transformer() {
      return (this.transform + this.translate);
    },
  },
  methods: {

  },
  created() {

  },
  mounted() {
    console.log(this.styles.wrap.transform);
    console.log(this.transformer);
    Eventbus.$on('set-translate', (translate) => {
      this.translate = ('(' + translate + 'px)');
    //  console.log('receiving translate', this.translate, translate);
    //  console.log('transformer', this.transformer);
    });
    Eventbus.$on('progress', (progress) => {
      this.progress = progress;
    });
  },
};
</script>

<style lang="scss">
</style>
