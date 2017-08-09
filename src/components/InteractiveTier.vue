<template lang="html">
  <div class="tier interactive-tier" :class="'tier'+tiernr">
    <slot>
    </slot>
    <row>
    
    </row>

  </div>
</template>

<script>
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
