<template lang="html">
  <div class="tier">
    <slot name="tierRender">
    </slot>
    <slot name="interactive">
    </slot>
    <template v-if="type === 'interactive'">
      <interaction v-for="item in step.interactions"
      :key="item.id"
      :type="item.animation.behaviour"
      :animation="item.animation"
      :interactionItem="item.interactionItem"
      :tierIndex="tierIndex"
      :mainActiveIndex="mainActiveIndex"
      :interactionContext="interactionContext"
      :sceneNumber="sceneNumber"
      ref="interaction">
      </interaction>
    </template>
    <row v-for="(item, index) in rows"
    :key="item.id"
    :row="item"
    :rowName="(tierName + '-r' + index)"
    :tierIndex="tierIndex"
    :sceneNumber="sceneNumber"
    :mainActiveIndex="mainActiveIndex"
    :interactionContext="interactionContext">
      <template slot="panel" scope="rowProps">
        <panel v-for="(item, index) in item.panels"
        :key="item.id"
        :panel="item"
        :type="item.type"
        :panelName="(rowProps.rowName + '-p' + index)"
        :panelArray="panelArray"
        :sceneNumber="sceneNumber"
        ref="panel">
          <template v-if="item.interactions">
            <interaction v-for="item in item.interactions"
            :key="item.id"
            :type="item.animation.behaviour"
            :animation="item.animation"
            :interactionItem="item.interactionItem"
            :tierIndex="tierIndex"
            :mainActiveIndex="mainActiveIndex"
            :interactionContext="interactionContext"
            :sceneNumber="sceneNumber"
            ref="interaction">
            </interaction>
          </template>
        </panel>
      </template>
    </row>
  </div>
</template>

<script>

import Row from './Row';

import Panel from './Panel';

import Interaction from './Interaction';

import addZero from './mixins';

export default {
  mixins: [addZero],
  name: 'tier',
  props: ['type', 'rows', 'tierName', 'activeIndex', 'tier', 'tierIndex', 'interactionContext', 'sceneNumber', 'panelArray', 'mainActiveIndex', 'stepName', 'step', 'stepIndex'],
  data() {
    return {
      slideIndex: '',
    };
  },
  computed: {
    panelsInTierArr() {
      const panArr = [];
      this.tier.rows.forEach((ro) => {
               ro.panels.forEach((po) => {
                 panArr.push(po);
               });
           });
      return panArr;
    },
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
  beforeMount() {
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
  box-sizing: border-box;
  margin: 0;
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 3%;
  padding-right: 3%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: stretch;
  align-items: stretch;
  width: 100%;
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
