<template lang="html">
<div class="">
  <img :src="animAssetArt" alt="">
</div>
</template>

<script>
import animAssetArt from './mixins';

export default {
  mixins: [animAssetArt],
  name: 'interaction-item',
  props: ['animAsset', 'transform', 'animDirection', 'assetFormat'],
  data() {
    return {

    };
  },
  computed: {

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
</style>
