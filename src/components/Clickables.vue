<template>
  <div>
    <button @click="clickTest()">Click Check Console</button>
    <Scene v-model="scene">
      <Entity v-model="entity1" :position="[3, -2, -3]">
        <Box v-model="box1"></Box>
      </Entity>
    </Scene>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import vb from "vue-babylonjs";
Vue.use(vb);

@Component
export default class Clickables extends Vue {
  private scene!: BABYLON.Scene;
  private engine!: BABYLON.Engine;
  private canvas!: HTMLCanvasElement;
  private camera!: BABYLON.ArcRotateCamera;

  private entity1!: any;
  private box1!: any;

  constructor() {
    super();
    this.canvas = document.getElementById("view") as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    // create a Camera, and set its position to (x:0, y:5, z:-10)
    this.camera = new BABYLON.ArcRotateCamera(
      "Camera",
      (3 * Math.PI) / 4,
      Math.PI / 4,
      4,
      BABYLON.Vector3.Zero(),
      this.scene
    );
    // this.camera.attachControl(this.canvas, true);

    this.entity1 = null;
    this.box1 = null;
  }

  clickTest() {
    console.log("You clicked me!");
  }

  @Watch("entity1")
  myMeshbuilderEntity() {
    console.log(
      "Entity1 position:",
      this.entity1.getPositionExpressedInLocalSpace()
    );
  }

  @Watch("scene")
  doSomethingToTheScene() {
    let scene = this;
    console.log("Scene: ", this.scene);
  }

  @Watch("camera")
  myCamera() {
    this.camera.attachControl(this.canvas, true);
    console.log("Camera: ", this.camera);
  }

  @Watch("box1")
  myBoxLoaded() {
    console.log(
      "Box1 position | Local space:",
      this.box1.getPositionExpressedInLocalSpace()
    ); // this.box1 & this.camera is present
    console.log(
      "Box1 position | Camera space:",
      this.box1.getPositionInCameraSpace(this.camera)
    );
  }
}
</script>