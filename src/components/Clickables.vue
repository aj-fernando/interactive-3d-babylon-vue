<template>
  <div>
    <button @click="clickCheckScene()">Click Check Console</button>
    <Scene v-model="scene1">
      <Camera v-model="camera1" type="arcRotate"></Camera>

      <Ground v-model="ground1" :options="{width:10, height:10}">
        <Material diffuse="#F00"></Material>
      </Ground>

      <Entity v-model="entity1" :position="[3, 5, -3]">
        <Box v-model="box1"></Box>
        <Sphere v-model="sphere1" :position="[0, 3, 4]"></Sphere>
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
  private scene1!: BABYLON.Scene;
  private engine1!: BABYLON.Engine;
  private ground1!: any;
  private canvas1!: HTMLCanvasElement;
  private camera1!: BABYLON.ArcRotateCamera;

  private entity1!: any;
  private box1!: any;
  private sphere1!: any;

  constructor() {
    super();
    this.canvas1 = document.getElementById("view") as HTMLCanvasElement;
    this.engine1 = new BABYLON.Engine(this.canvas1, true);
    this.scene1 = new BABYLON.Scene(this.engine1);
    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    this.camera1 = new BABYLON.ArcRotateCamera(
      "Camera",
      (3 * Math.PI) / 2,
      Math.PI / 4,
      30,
      BABYLON.Vector3.Zero(),
      this.scene1
    );
    // this.camera1.attachControl(this.canvas1, true);
    this.ground1 = null;
    this.entity1 = null;
    this.box1 = null;
    this.sphere1 = null;
  }

  clickCheckScene() {
    console.log("Check to see if scene is ready!");
    if (this.ground1 && this.camera1) {
      console.log("Scene: ", this.scene1);
      console.log("Camera: ", this.camera1);
    }
  }

  @Watch("scene1")
  myScene() {
    console.log("SCENE WATCH: ", this.scene1);
  }

  @Watch("camera1")
  myCamera() {
    // this.camera1.attachControl(this.canvas1, true);
    console.log("CAMERA WATCH: ", this.camera1);
    this.clickCheckScene();
  }

  @Watch("ground1")
  myGround() {
    console.log("Ground: ", this.ground1);
    this.clickCheckScene();
  }

  @Watch("entity1")
  myMeshbuilderEntity() {
    console.log(
      "Entity1 position:",
      this.entity1.getPositionExpressedInLocalSpace()
    );
  }

  @Watch("box1")
  myBoxLoaded() {
    var mesh1 = this.box1;
    mesh1.actionManager = new BABYLON.ActionManager(this.scene1);
    mesh1.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function() {
          alert("Box clicked!");
        }
      )
    );
  }

  @Watch("sphere1")
  mySphereLoaded() {
    var mesh1 = this.sphere1;
    mesh1.actionManager = new BABYLON.ActionManager(this.scene1);
    mesh1.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function() {
          alert("Sphere clicked!");
        }
      )
    );
  }
}
</script>