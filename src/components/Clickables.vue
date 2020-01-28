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
  private canvas1!: HTMLCanvasElement;
  private camera1!: BABYLON.ArcRotateCamera;
  private gui3dManager1!: GUI.GUI3DManager;
  private gui3dpanel1!: GUI.StackPanel3D;

  private ground1: any;
  private entity1: any;
  private box1: any;

  constructor() {
    super();

    // this.camera1.attachControl(this.canvas1, true);
    this.ground1 = null;
    this.entity1 = null;
    this.box1 = null;

    //this.addButton(this.gui3dpanel1);
  }

  createScene() {
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

    //GUI
    this.gui3dManager1 = new GUI.GUI3DManager(this.scene1);
    this.gui3dpanel1 = new GUI.StackPanel3D();
    this.gui3dpanel1.margin = 0.02;
    this.gui3dManager1.addControl(this.gui3dpanel1);
    this.gui3dpanel1.position.z = -1.5;
  }
  // Let's add some buttons!
  addButton(panel: GUI.StackPanel3D) {
    var button = new GUI.Button3D("orientation");
    panel.addControl(button);
    button.onPointerUpObservable.add(function() {
      panel.isVertical = !panel.isVertical;
    });

    var text1 = new GUI.TextBlock();
    text1.text = "change orientation";
    text1.color = "white";
    text1.fontSize = 24;
    button.content = text1;
  }

  clickCheckScene() {
    console.log("Check to see if scene is ready!");
    if (this.ground1 && this.camera1) {
      console.log("Scene: ", this.scene1);
      console.log("Camera: ", this.camera1);
      this.addButton(this.gui3dpanel1);
    }

    // // Create a sprite manager to optimize GPU ressources
    // // Parameters : name, imgUrl, capacity, cellSize, scene
    // var spriteManagerTrees = new BABYLON.SpriteManager(
    //   "treesManager",
    //   "../assets/elephantbaby.png",
    //   2000,
    //   800,
    //   this.scene1
    // );

    // //We create 2000 trees at random positions
    // var tree = null;
    // for (var i = 0; i < 2000; i++) {
    //   tree = new BABYLON.Sprite("tree", spriteManagerTrees);
    //   tree.position.x = Math.random() * 100 - 50;
    //   tree.position.z = Math.random() * 100 - 50;
    // }
  }

  @Watch("scene1")
  myScene() {
    console.log("SCENE WATCH: ", this.scene1);
  }

  @Watch("camera1")
  myCamera() {
    // this.camera1.attachControl(this.canvas1, true);
    console.log("CAMERA WATCH: ", this.camera1);
  }

  @Watch("ground1")
  myGround() {
    console.log("Ground: ", this.ground1);
  }

  @Watch("entity1")
  myMeshbuilderEntity() {
    console.log(
      "Entity1 position:",
      this.entity1.getPositionExpressedInLocalSpace()
    );
    this.clickCheckScene();
  }

  @Watch("box1")
  myBoxLoaded() {
    var mesh1 = this.box1;
    mesh1.actionManager = new BABYLON.ActionManager(this.scene1);
    mesh1.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function(mesh1) {
          console.log("Got Pick Action: Mesh", mesh1);
        }
      )
    );
  }
}
</script>