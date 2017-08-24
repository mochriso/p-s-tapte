<template lang="html">
  <div :class="['tier', tiernr, type]">
    <slot>
    </slot>
    <row v-for="(item, index) in rows" :key="item.id" :row="item" :rownr="addZero(index+1)">
      <template v-if="item.interaction">
        <interaction-item v-show="showInt" :animAsset="item.interaction.animAsset" :transform="item.interaction.transform" :animDirection="item.interaction.animDirection">
        </interaction-item>
      </template>
      <template v-for="item in item.panels">
        <panel :key="item.id" :panel="item" :type="item.type">
          <template v-if="item.interaction">
            <interaction-item v-show="showInt" :animAsset="item.interaction.animAsset" :transform="item.interaction.transform" :animDirection="item.interaction.animDirection" >
            </interaction-item>
          </template>
        </panel>
      </template>
    </row>
  </div>
</template>

<script>
// import { Eventbus } from './eventbus';

import Row from './Row';

import Panel from './Panel';

import InteractionItem from './InteractionItem';

import addZero from './mixins';

export default {
  mixins: [addZero],
  name: 'tier',
  props: ['tierIndex', 'type', 'rows', 'tiernr', 'activeIndex', 'interactions'],
  data() {
    return {
      showInt: true,
    };
  },
  computed: {

  },
  methods: {

    // emitActiveType() {
    //     Eventbus.$emit('the-active-tier-type', this.index, this.type);
    //     console.log('emitting active index and type', this.index, this.type);
    //  },
    //  emitEveryType(val) {
    //      Eventbus.$emit('every-tier-type', this.index, this.type);
    //      console.log('emitting every index and type', this.index, this.type);
    //   },
  },
  watch: {
    // activeIndex: {
    //   handler: function handla(val, oldVal) {
    //     if (this.index === val) {
    //       this.emitActiveType();
    //     }
    //   },
    // },
  },
  created() {

  },
  mounted() {
  //  this.emitEveryType();
  //  const ind = this.index;
  //  this.tierIndex(ind);
// console.log(this.index);
  },
  components: { Panel, Row, InteractionItem },
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
