<template>
  <div>
    <h1> Hello Playground </h1>
      <button @click="test()" v-if="this.counter >= 2" > Click Me </button>
      <Scene>
        <Box v-on:click="test()"></Box>
      </Scene>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import vb from "vue-babylonjs";
Vue.use(vb);

@Component
export default class Playground extends Vue {

    private counter: number

    constructor() {
      super();
      this.counter = 2;
    }
    test() {
        console.log("Hello");
    }

}
</script>