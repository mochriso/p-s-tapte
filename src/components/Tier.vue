<template lang="html">
  <div :class="['tier', tiernr, type]">
    <slot>
    </slot>
    <template v-if="self.interaction">
      <interaction :type="self.interaction.animation.behaviour" :eventVals="eventVals" :animation="self.interaction.animation" :interactionIndex.sync="interactionIndex" ref="interaction">
        <interaction-item v-show="showInt" :animAsset="self.interaction.interactionItem.animAsset">
        </interaction-item>
      </interaction>
    </template>
    <row v-for="(item, index) in rows" :key="item.id" :row="item" :rownr="addZero(index+1)">
      <template v-if="item.interaction">
        <interaction :type="item.interaction.animation.behaviour" :eventVals="eventVals" :animation="item.interaction.animation" :interactionIndex.sync="interactionIndex" ref="interaction">
          <interaction-item v-show="showInt" :animAsset="item.interaction.interactionItem.animAsset">
          </interaction-item>
        </interaction>
      </template>
      <template v-for="item in item.panels">
        <panel :key="item.id" :panel="item" :type="item.type">
          <template v-if="item.interaction">
            <interaction :type="item.interaction.animation.behaviour" :eventVals="eventVals" :animation="item.interaction.animation" :interactionIndex.sync="interactionIndex" ref="interaction">
              <interaction-item v-show="showInt" :animAsset="item.interaction.interactionItem.animAsset">
              </interaction-item>
            </interaction>
          </template>
        </panel>
      </template>
    </row>
  </div>
</template>

<script>
import { Eventbus } from './eventbus';

// import { Eventbus } from './eventbus';
import Interaction from './Interaction';

import Row from './Row';

import Panel from './Panel';

import InteractionItem from './InteractionItem';

import addZero from './mixins';

export default {
  mixins: [addZero],
  name: 'tier',
  props: ['type', 'rows', 'tiernr', 'activeIndex', 'self'],
  data() {
    return {
      showInt: true,
      interactionIndex: 0,
      eventVals: {
        translateVal: '',
        transitionVal: '',
        progressVal: '',
      },
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
    Eventbus.$on('int-translate', (translate) => {
      this.eventVals.translateVal = translate;
      console.log('translateVals', this.eventVals.translateVal, translate);
    });
    Eventbus.$on('int-transition', (transition) => {
      this.eventVals.transitionVal = transition;
      console.log('transitionVals', this.eventVals.transitionVal, transition);
    });
    Eventbus.$on('int-progress', (progress) => {
      this.eventVals.progressVal = progress;
      console.log('progressVals', this.eventVals.progressVal, progress);
    });
  },
  mounted() {
  //  this.emitEveryType();
  //  const ind = this.index;
  //  this.tierIndex(ind);
// console.log(this.index);
  },
  components: { Panel, Row, InteractionItem, Interaction },
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
