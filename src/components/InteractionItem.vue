<template lang="html">
<div class="interaction-item">
  <img :src="animAssetArt" alt="">
</div>
</template>

<script>
import animAssetArt from './mixins';

import { Eventbus } from './eventbus';

export default {
  mixins: [animAssetArt],
  name: 'interaction-item',
  props: ['animAsset'],
  data() {
    return {
      // interactivity: {
      //   translateVal: '',
      //   transitionVal: '',
      //   progressVal: '',
      // },
      styles: {
        wrap: {
          transitionProperty: 'transform',
        },
        img: {

        },
      },
    };
  },
  computed: {


      // set: () => {
      //   const val = this.transform + '(' + this.translateVal + 'px)';
      //   const obj = {};
      //   obj.transform = val;
      //   obj.transitionProperty = 'transform';
      //   this.styles.wrap = obj;
      // },
      // return obj;
      // obj[transform] = this.transform + '(' + this.translate + 'px)';
      // console.log(obj);
      // return (obj);

  },
  methods: {

  },
  created() {
    // Eventbus.$on('int-translate', (translate) => {
    //   this.interactivity.translateVal = translate;
    //   console.log('translateVals', this.interactivity.translateVal, translate);
    // });
    // Eventbus.$on('int-transition', (transition) => {
    //   this.interactivity.transitionVal = transition;
    //   console.log('transitionVals', this.interactivity.transitionVal, transition);
    // });
    // Eventbus.$on('int-progress', (progress) => {
    //   this.interactivity.progressVal = progress;
    //   console.log('progressVals', this.interactivity.progressVal, progress);
    // });
  },
  mounted() {
  //  console.log(this.styles.wrap.transform);
 // console.log(this.transformer);
  },
};
</script>

<style lang="scss">
.interaction-item {
  position: absolute;
  width: 100%;
  height: auto;
}
</style>
