export default {
  computed: {
    panelBgArt() {
      return require('../assets/images/' + this.panel.name + '.jpg');
    },
  },
  methods: {
  // Boolean Comparing two arguments
    same: function same(ind, acInd) {
      if (ind === acInd) {
        return true;
      }
        return false;
    },
    iterate: function iterate(arr, callback) {
      let i;
      for (i = 0; i < arr.length; i += 1) {
          return callback;
        }
      },
      addZero(number) {
        return (number < 10) ? '0' + number.toString() : number.toString();
      },
  },
};
