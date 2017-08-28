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
  },
  render(createElement) {
    // const { props: attrs } = this;
    console.log(this);
    return createElement(this.type, {
      props: {
        animation: this.animation,
      },
      class: {
          foo: true,
        },
    },
      this.$slots.default);
  },

};
</script>
