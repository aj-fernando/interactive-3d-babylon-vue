<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Scene>
      <Camera type="arcRotate" :alpha="20" :beta="-15" :radius="70" :position="[100, 100, 100]"></Camera>
      <HemisphericLight diffuse="#000"></HemisphericLight>

      <Asset :src="publicPath+'stage.obj'"></Asset>

      <DirectionalLight specular="#0F0" diffuse="000" :direction="[0,0,-1]"></DirectionalLight>

      <Entity v-model="array1">
        <Asset
          v-model="array1_speaker1"
          :src="publicPath+'speakermodule.obj'"
          :scaling="this.speakerScaling"
          :position="[3,6.1,0]"
        ></Asset>
        <Asset
          v-model="array1_speaker2"
          :src="publicPath+'speakermodule.obj'"
          :scaling="this.speakerScaling"
          :position="[3,3,0]"
        ></Asset>
      </Entity>

      <Entity v-model="array2">
        <Asset
          v-model="array2_speaker1"
          :src="publicPath+'speakermodule.obj'"
          :scaling="this.speakerScaling"
          :position="[-5,6.1,0]"
        ></Asset>
        <Asset
          v-model="array2_speaker2"
          :src="publicPath+'speakermodule.obj'"
          :scaling="this.speakerScaling"
          :position="[-5,3,0]"
        ></Asset>
      </Entity>
    </Scene>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import vb from "vue-babylonjs";
import { Vector3 } from "babylonjs";
Vue.use(vb);

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private scene1!: BABYLON.Scene;
  private engine1!: BABYLON.Engine;
  private ground1!: any;
  private canvas1!: HTMLCanvasElement;
  private camera1!: BABYLON.ArcRotateCamera;

  private array1!: any;
  private array2!: any;
  private array1_speaker1!: any;
  private array1_speaker2!: any;
  private array2_speaker1!: any;
  private array2_speaker2!: any;
  private speakerScaling: Vector3;

  private publicPath: string;

  constructor() {
    super();

    this.publicPath = `${process.env.BASE_URL}`;
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

    this.array1 = null;
    this.array2 = null;
    this.array1_speaker1 = null;
    this.array1_speaker2 = null;
    this.array2_speaker1 = null;
    this.array2_speaker2 = null;
    this.speakerScaling = new Vector3(0.005, 0.005, 0.005);
  }

  @Watch("array1_speaker1")
  array1Speaker1Loaded() {
    var mesh = this.array1_speaker1;
    mesh.actionManager = new BABYLON.ActionManager(this.scene1);
    mesh.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function() {
          alert("Array1 Speaker1 clicked!");
        }
      )
    );
  }
  @Watch("array2_speaker2")
  array2Speaker2Loaded() {
    var mesh = this.array2_speaker2;
    mesh.actionManager = new BABYLON.ActionManager(this.scene1);
    mesh.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function() {
          alert("Array2 Speaker2 clicked!");
        }
      )
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
