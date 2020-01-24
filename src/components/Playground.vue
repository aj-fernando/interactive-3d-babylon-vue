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

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import vb from "vue-babylonjs";
Vue.use(vb);

export default {
  data() {
    return {
      scene: null,
      ground: null,
      camera: null
    };
  },
    
  watch: {
    ground() {
      this.active();
    },

    camera() {
      this.active();
    },
  },

  methods: {
    active() {
      if (this.ground && this.camera) {
        // this.scene, this.camera, and this.ground are all should be available now
        console.log(this.scene); // but scene is still null
        console.log(this.ground.getScene().getEngine().getRenderingCanvas()); // this.ground & this.camera is present
        console.log(this.camera.getScene().getEngine().getRenderingCanvas()); // result should be the same canvas
        this.scene = this.camera.getScene();
        console.log(this.scene);

      }
    },
  },
};
</script>