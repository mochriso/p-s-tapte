export default {
  methods: {
  // Boolean Comparing two arguments
    same(ind, acInd) {
      if (ind === acInd) {
        return true;
      }
        return false;
    },
    iterate(arr, action) {
      let i;
      for (i = 0; i < arr.length; i += 1) {
           action(arr[i]);
        }
      },
      addZero(number) {
        return (number < 10) ? '0' + number.toString() : number.toString();
      },
  },
  computed: {
    panelBgArt() {
      return require('../assets/images/' + this.panel.name + '.jpg');
    },
    animAssetArt() {
      return require('../assets/images/' + this.animAsset + this.assetFormat);
    },

  },
 };
