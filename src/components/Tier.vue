<template lang="html">
  <div class="tier">
    <slot name="row"
    :tierName="tierName"
    :tierIndex="tierIndex"
    :sceneNumber="sceneNumber"
    :slideIndex="slideIndex"
    :intActiveIndex="intActiveIndex">
    </slot>
    <slot name="interactive">
    </slot>
    <template v-if="type === 'interactive'">
    </template>
  </div>
</template>

<script>
import { IntEventbus } from './inteventbus';

import Row from './Row';

import Panel from './Panel';

import Interaction from './Interaction';

import addZero from './mixins';

export default {
  mixins: [addZero],
  name: 'tier',
  props: ['slideIndex', 'isMainActiveSlide', 'type', 'rows', 'tierName', 'activeIndex', 'tier', 'tierIndex', 'sceneNumber', 'mainActiveIndex', 'stepName', 'step'],
  components: { Panel, Row, Interaction },
  data() {
    return {
      intActiveIndex: '',
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
    listenForIntActiveIndex() {
      IntEventbus.$on('int-active-index', (intActiveIndex, slideIndex) => {
        if (slideIndex === this.slideIndex) {
      //    console.log('recieved intActiveIndex, slideIndex', intActiveIndex, slideIndex);
          this.intActiveIndex = intActiveIndex;
        }
      });
    },
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
    this.listenForIntActiveIndex();
  },
  beforeMount() {
  },
  mounted() {


  //  this.emitEveryType();
  //  const ind = this.index;
  //  this.tierIndex(ind);
// console.log(this.index);
  },
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
