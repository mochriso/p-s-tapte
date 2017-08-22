<template lang="html">
  <div class="tier interactive-tier" :class="'tier'+tiernr">
    <slot>
    </slot>
    <row>

    </row>

  </div>
</template>

<script>
  // data for tier 10
  // { rows: [
  //   { panels: [
  //     { name: 't10-a04', type: 'static', position: 'center top' },
  //   ] },
  //   ],
  // },

import Row from './Row';

import StaticPanel from './StaticPanel';

import AnimPanel from './AnimPanel';

export default {
  mixins: [],
  name: 'interactive-tier',
  props: ['name', 'type', 'rows', 'tiernr'],
  components: { AnimPanel, StaticPanel, Row },
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
