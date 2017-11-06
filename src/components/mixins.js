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
    addTwoZeroes(num) {
      if (num < 10) {
        return ('00' + num.toString());
      }
      else if (num > 10 && num < 100) {
        return ('0' + num.toString());
      }
        return (num.toString());
    },
  },
  computed: {
    panelArt() {
     return require('../assets/images/art/story/chapter/scenes/' + this.sceneNumber + '/' + this.panelName + '.jpg');
    },
    swappedPanelArt() {
     return require('../assets/images/art/story/chapter/scenes/' + this.sceneNumber + '/' + this.panelName + '-n.jpg');
    },
    animAssetArt() {
      return require('../assets/images/art/story/chapter/scenes/' + this.sceneNumber + '/' + this.animAsset);
    },

  },
 };
