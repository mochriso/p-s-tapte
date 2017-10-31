<template lang="html">
  <div :class="['tier', tiernr, type]">
    <slot>
    </slot>
    <template v-if="tier.interactions">
      <interaction v-for="item in tier.interactions"
      :key="item.id"
      :type="item.animation.behaviour"
      :interactionIndex="item.interactionIndex"
      :animation="item.animation"
      :interactionItem="item.interactionItem"
      :tierIndex="tierIndex"
      :mainActiveIndex="activeIndex"
      :interactionContext="interactionContext"
      ref="interaction">
      </interaction>
    </template>
    <row v-for="(item, index) in rows" :key="item.id" :row="item" :rownr="addZero(index+1)">
      <template v-if="item.interactions">
        <interaction v-for="item in item.interactions"
        :key="item.id"
        :type="item.animation.behaviour"
        :interactionIndex="item.interactionIndex"
        :animation="item.animation"
        :interactionItem="item.interactionItem"
        :tierIndex="tierIndex"
        :mainActiveIndex="activeIndex"
        :interactionContext="interactionContext"
        ref="interaction">
        </interaction>
      </template>
        <panel v-for="(item, index) in item.panels" :key="item.id" :panel="item" :type="item.type">
          <template v-if="item.interactions">
            <interaction v-for="item in item.interactions"
            :key="item.id"
            :type="item.animation.behaviour"
            :interactionIndex="item.interactionIndex"
            :animation="item.animation"
            :interactionItem="item.interactionItem"
            :tierIndex="tierIndex"
            :mainActiveIndex="activeIndex"
            :interactionContext="interactionContext"
            ref="interaction">
            </interaction>
          </template>
        </panel>
    </row>
  </div>
</template>

<script>
// :interactionIndex="yourIndex(item)"

import Row from './Row';

import Panel from './Panel';

import Interaction from './Interaction';

import addZero from './mixins';

export default {
  mixins: [addZero],
  name: 'tier',
  props: ['type', 'rows', 'tiernr', 'activeIndex', 'tier', 'intTierArray', 'tierIndex', 'interactionContext'],
  data() {
    return {
    };
  },
  computed: {
    // interactionsArray() {
    //   const itArr = this.intTierArray;
    //   const allInteractions = [];
    //   for (let i = 0; i < itArr.length; i += 1) {
    //     if (itArr[i].interactions) {
    //       itArr[i].interactions.forEach((int) => {
    //         allInteractions.push(int);
    //       });
    //     }
    //     for (let y = 0; y < itArr[i].rows.length; y += 1) {
    //       if (itArr[i].rows[y].interactions) {
    //         itArr[i].rows[y].interactions.forEach((int) => {
    //           allInteractions.push(int);
    //         });
    //       }
    //       for (let b = 0; b < itArr[i].rows[y].panels.length; b += 1) {
    //         if (itArr[i].rows[y].panels[b].interactions) {
    //           itArr[i].rows[y].panels[b].interactions.forEach((int) => {
    //             allInteractions.push(int);
    //           });
    //         }
    //       }
    //     }
    //   }
    //   return allInteractions;
    // },

  },
  methods: {
    // yourIndex(obj) {
    //   this.allInteractions.push(obj);
    //   return allInteractions.indexOf(obj);
    // },
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
  components: { Panel, Row, Interaction },
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
