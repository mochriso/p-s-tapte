<template lang="html">
  <div class="panel static" :style="{ 'flex-grow': panel.grow }">
    <img :class="panel.name" :style="{ 'object-position': panel.position }" :src="panelBgArt" :alt="panel.name">
  </div>
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
    // getPanelSize

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
.static {
  img {
    min-width: 0%;
    min-height: 0%;
    flex: 1 1 0;
    align-items: stretch;
    object-fit: cover;
  }
}


</style>
