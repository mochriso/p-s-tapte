<template lang="html">
  <div class="tier" :class="'tier'+tiernr">
    <slot>
    </slot>
    <row v-for="(item, index) in rows" :key="item.id" :row="item" :rownr="addZero(index+1)">
      <template v-for="item in item.panels">
        <panel :key="item.id" :panel="item"></panel>
      </template>
    </row>
  </div>
</template>

<script>
import Row from './Row';

import Panel from './Panel';

import addZero from './mixins';

export default {
  mixins: [addZero],
  name: 'tier',
  props: ['name', 'type', 'rows', 'tiernr'],
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
  components: { Panel, Row },
};
</script>

<style lang="scss">
.tier {
  margin: 0;
  padding-left: 2.5%;
  padding-right: 2.5%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: stretch;
  align-items: stretch;
  height: 100%;
}

// SPECIAL ROW VERTICAL LAYOUTS
// .tier01 .row1 {
//   flex-grow: 1.3;
// }

.tier10 .row2 {
  flex-grow: 2;
}
</style>
