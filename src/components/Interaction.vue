<script>
import SwipeInFlyOut from './interactions/SwipeInFlyOut';

export default {
  name: 'interaction',
  components: {
    SwipeInFlyOut,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    animation: {
      type: Object,
      default: () => ({}),
    },
    eventVals: {
      type: Object,
      default: () => ({}),
    },
    interactionIndex: {
      type: Number,
      required: true,
    },
  },
  render(createElement) {
    // const { props: attrs } = this;
    console.log(this);
    return createElement(this.type, {
      props: {
        animation: this.animation,
        interactionIndex: this.interactionIndex,
        eventVals: this.eventVals,
      },
      class: {
          foo: true,
        },
    },
      this.$slots.default);
  },

};
</script>
