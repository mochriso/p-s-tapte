<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'app',
  components: {
    Home,
  },
};
</script>

<style>
body {
 background: #f2f2f2;
 font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
 font-size: 16px;
 color: black;
 margin: 0;
 padding: 0;
/* overflow:hidden;*/
 overflow: auto;
 -webkit-overflow-scrolling: touch;
}

html, body, #app{
   position: relative;
   width: 100vw;
   height: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
