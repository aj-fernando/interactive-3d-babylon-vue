<template>
  <div class="hello">
    <component
      :is="field.component"
      :key="key"
      :name="field.name"
      v-for="(field, key) in integration_data"
      v-model="field.value"
    >
      <div>{{field.value}}</div>
    </component>

    <h1>{{ msg }}</h1>
    <ul v-for="array in arrayList" :key="array.id">
      <li v-for="speaker in array.speakerList" :key="speaker.id">{{ speaker.id }}</li>
    </ul>

    <Scene>
      <Camera type="arcRotate" :alpha="20" :beta="-15" :radius="70" :position="[100, 100, 100]"></Camera>
      <HemisphericLight diffuse="#000"></HemisphericLight>

      <Asset :src="publicPath+'stage.obj'"></Asset>

      <DirectionalLight specular="#0F0" diffuse="000" :direction="[0,0,-1]"></DirectionalLight>

      <Entity v-model="watchArray" v-for="array in arrayList" :key="array.id" @entity="onArray">
        <Asset
          v-model="watchSpeaker"
          @entity="onSpeaker"
          v-for="speaker in array.speakerList"
          :key="speaker.id"
          :src="speakerPath"
          :scaling="speakerScaling"
          :position="speaker.position"
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

interface IArrayModel {
  id: string;
  speakerList: ISpeakerModel[];
}

interface ISpeakerModel {
  id: string;
  position: Vector3;
}

interface IIntegrationData {
  name: string;
  component: string;
  value: string;
}

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private scene1!: BABYLON.Scene;
  private engine1!: BABYLON.Engine;
  private ground1!: any;
  private canvas1!: HTMLCanvasElement;
  private camera1!: BABYLON.ArcRotateCamera;

  private speakerScaling: Vector3;
  private speakerPath: string;

  private arrayList: IArrayModel[];
  private watchArray: any;
  private watchSpeaker: any;

  private publicPath: string;

  private integration_data: IIntegrationData;

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

    this.speakerScaling = new Vector3(0.005, 0.005, 0.005);
    this.speakerPath = this.publicPath + "speakermodule.obj";

    this.arrayList = [
      {
        id: "array1",
        speakerList: [
          { id: "array1-speaker1", position: new Vector3(3, 6.1, 0) },
          { id: "array1-speaker2", position: new Vector3(3, 3, 0) }
        ]
      },
      {
        id: "array2",
        speakerList: [
          { id: "array2-speaker1", position: new Vector3(-5, 6.1, 0) },
          { id: "array2-speaker2", position: new Vector3(-5, 3, 0) }
        ]
      }
    ];
    this.watchSpeaker = null;
    this.watchArray = null;

    this.integration_data = { name: "one", component: "one", value: "ok" };
  }

  onSpeaker(event: any) {
    this.watchSpeaker = event.entity;
    console.log("onSpeaker: ", event);
    // console.log("speaker: ", this.watchSpeaker);
  }

  onArray(event: any) {
    console.log("onArray: ", event);
    // console.log("speaker: ", this.watchSpeaker);
  }

  // @Watch("watchSpeaker")
  // speakerLoaded() {
  //   console.log("watchspeaker: ", this.watchSpeaker);
  //   var mesh = this.watchSpeaker;
  //   mesh.actionManager = new BABYLON.ActionManager(this.scene1);
  //   mesh.actionManager.registerAction(
  //     new BABYLON.ExecuteCodeAction(
  //       BABYLON.ActionManager.OnPickTrigger,
  //       function() {
  //         alert("Speaker clicked!");
  //       }
  //     )
  //   );
  // }
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
