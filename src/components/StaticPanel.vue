<template lang="html">
  <img class="panel" :class="panel.name" :style="{'flex-grow': panel.grow, 'object-fit': 'cover', 'object-position': panel.position }" :src="panelBgArt" :alt="panel.name">
</template>

<script>
import panelBgArt from './mixins';

export default {
  mixins: [panelBgArt],
  name: 'static-panel',
  props: ['panel', 'panelnr'],
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

<style scoped lang="scss">

</style>
