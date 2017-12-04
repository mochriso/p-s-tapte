<template lang="html">
  <div :style="{ 'flex-grow': row.grow }" :class="['row', rowName]">
    <template v-if="this.row.interactions">
      <interaction v-for="item in this.row.interactions"
      :key="item.id"
      :type="item.animation.behaviour"
      :animation="item.animation"
      :interactionItem="item.interactionItem"
      :tierIndex="this.tierIndex"
      :mainActiveIndex="this.activeIndex"
      :interactionContext="this.interactionContext"
      :sceneNumber="sceneNumber"
      ref="rowInteraction">
      </interaction>
    </template>
    <slot name ="panel" :rowName="this.rowName">
    </slot>
  </div>
</template>

<script>
export default {
  mixins: [],
  name: 'row',
  props: ['row', 'rowName', 'tierIndex', 'activeIndex', 'interactionContext', 'sceneNumber', 'mainActiveIndex'],
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
/* --- ROWS --- */
 .row + .row {
   margin-top: 4.5%;
 }

 .row {
   flex: 1 1 0;
   align-self: auto;

   display: flex;
   flex-direction: row;
   align-content: space-between;
   align-items: stretch;

   overflow: hidden;
   // min-width: 0;
   // min-height: 50%;
   padding: 0;
   padding-bottom: 0;

   /* --- PANELS --- */
      .panel {
        // display: flex;
        flex: 1 1 0;
        box-sizing: border-box;
      //  width: auto;
        height: inherit;
        overflow: hidden;
        border-style: solid;
        border-width: 2px;
        border-color: #333333;
        position:relative;

         display: flex;
         align-items: stretch;
      //  flex-direction: column;

        .paneltitle {
          position: absolute;
          right:0;
          bottom:0;
          margin:0;
          padding:0;
          p {
            font-size: 1em;
            color: red;
            margin:0;
            padding:0;
            background-color: white;

          }
        }
          // img {
          //   // width:100%;
          //   //height: inherit;
          //   padding: 0;
          //   margin:0;
          // }
     }
       .panel + .panel {
         margin-left: 3%;
       }

      //  .panel-wrap-flex1 {
      //  @extend .panel;
      //  flex: 1 1 auto;
      //  box-sizing: padding-box;
      //  overflow: hidden;
      //  }
   }
</style>
