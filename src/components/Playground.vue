<template>
  <div>
    <button @click="test()">Click me</button>
    <Scene
      v-model="scene"
      @complete="complete"
      @before-render$="beforeRender"
      @after-render$="++frames"
    >
      <Camera type="arcRotate" v-model="camera" :position="[5, 10, -10]"></Camera>
      <PointLight :position="[0, 2, -1]"></PointLight>

      <Box v-model="box1" :scaling="scale.box" :position="[0, 0, 5]">
        <Material diffuse="#F00"></Material>
      </Box>

      <Sphere :position="[2, 0, 5]" @entity="onSphere" :scaling="scale.sphere">
        <Material diffuse="#FB0"></Material>
      </Sphere>
      <Entity v-model="meshbuilderEntity" :position="[6, 0, 0]"></Entity>
    </Scene>

    <div
      v-text="`Frames: ${frames}`"
      style="position: absolute; color: white; bottom: 0; padding: 15px"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import * as BABYLON from "babylonjs";
import vb from "vue-babylonjs";
Vue.use(vb);

@Component
export default class Playground extends Vue {
  private box1!: any;
  private sphere1!: any;
  private meshbuilderEntity!: any;
  private time: number;
  private frames: number;

  private scene !: any;
  private ground !: any;
  private camera !: any;
    
  constructor() {
    super();
    this.time = performance.now();
    this.frames = 0;
    this.box1 = null;
    this.sphere1 = null;
    this.meshbuilderEntity = null;

    );

  }

  test() {
    console.log("YOu clicked me");
  }

  beforeRender() {
    this.time = performance.now();
  }

  onSphere(event: any) {
    console.log("onSphere", event);
    // the entity event includes entity reference
    this.sphere1 = event.entity;
  }

  complete(event: any) {
    console.log("complete", event);
    console.log("box", this.box1);
    console.log("sphere", this.sphere1);
  }

  get scale() {
    let a = 2 + Math.cos(this.time * 0.001);
    let b = 2 + Math.sin(this.time * 0.001);
    return {
      box: [a, b, 1],
      sphere: [b, a, 1]
    };
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