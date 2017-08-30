<template lang="html">
<div class="" :style="intValues">
  <slot>
  </slot>
</div>
</template>

<script>
export default {
  mixins: [],
  name: 'swipe-in-fly-out',
  props: ['animation', 'interactionIndex', 'eventVals', 'nextInteraction'],
  components: { },
  data() {
    return {

    };
  },
  computed: {
    intValues() {
        const val = 'translateX' + '(' + this.eventVals.translateVal + 'px)';
        const obj = {};
        obj.transform = val;
      //  console.log(obj);
        return (obj);
    },
  },
  methods: {

  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">

</style>
