<template>
  <Scene v-model="scene">
    <Camera type="arcRotate" v-model="camera" :position="[5, 10, -10]"></Camera>
    <PointLight :position="[0, 2, -1]"></PointLight>
    <Box :position="[0, 0, 5]"></Box>
    <Ground v-model="ground" :options="{width:100, height:100}">
      <Material diffuse="#F00"></Material> 
    </Ground>
  </Scene>
</template>

<script lang="ts">

import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import vb from "vue-babylonjs";
Vue.use(vb);

@Component
export default class Playground extends Vue {

  private scene !: any;
  private ground !: any;
  private camera !: any;
    
  constructor() {
    super();
    this.scene = null;
    this.ground = null;
    this.camera = null;
  }

  @Watch('scene')
  myScene() {
    console.log(this.scene); // this never happens, null is printed
  }

  @Watch('ground')
  myGround() {
    console.log(this.scene);
    console.log(this.ground.getScene().getEngine().getRenderingCanvas()); // this.ground & this.camera is present
  }

  @Watch('camera')
  myCamera() {
    console.log(this.scene);
    console.log(this.camera.getScene().getEngine().getRenderingCanvas()); // result should be the same canvas
  }
}
</script>