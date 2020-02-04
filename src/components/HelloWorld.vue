<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div v-for="array in arrayList" :key="'SW'+array.id">
      <div v-for="speaker in array.speakerList" :key="speaker.id">
        {{speaker.id}}
        <input type="text" v-model="speaker.position" />
      </div>
    </div>

    <!-- <ul v-for="array in arrayList" :key="array.id">
      <li v-for="speaker in array.speakerList" :key="speaker.id">{{ speaker.id }}</li>
    </ul>-->

    <Scene>
      <Camera type="arcRotate" :alpha="20" :beta="-15" :radius="70" :position="[100, 100, 100]"></Camera>
      <HemisphericLight diffuse="#000"></HemisphericLight>

      <Asset :src="publicPath+'stage.obj'"></Asset>

      <DirectionalLight specular="#0F0" diffuse="000" :direction="[0,0,-1]"></DirectionalLight>

      <Entity v-for="array in arrayList" :key="'SW'+array.id">
        <SpeakerWatch
          :speaker="speaker"
          :scene="scene1"
          v-for="speaker in array.speakerList"
          :key="speaker.id"
        ></SpeakerWatch>
      </Entity>
    </Scene>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import vb from "vue-babylonjs";
Vue.use(vb);
import SpeakerWatch from "@/components/SpeakerWatch.vue";

interface IArrayModel {
  id: string;
  speakerList: ISpeakerModel[];
}

interface ISpeakerModel {
  id: string;
  position: BABYLON.Vector3;
  scale?: BABYLON.Vector3;
  path?: string;
}

@Component({
  components: {
    SpeakerWatch
  }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private scene1!: BABYLON.Scene;
  private engine1!: BABYLON.Engine;
  private ground1!: any;
  private canvas1!: HTMLCanvasElement;
  private camera1!: BABYLON.ArcRotateCamera;

  private arrayList: IArrayModel[];

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

    this.arrayList = [
      {
        id: "array1",
        speakerList: [
          { id: "array1-speaker1", position: new BABYLON.Vector3(3, 6.1, 0) },
          { id: "array1-speaker2", position: new BABYLON.Vector3(3, 3, 0) }
        ]
      },
      {
        id: "array2",
        speakerList: [
          { id: "array2-speaker1", position: new BABYLON.Vector3(-5, 6.1, 0) },
          { id: "array2-speaker2", position: new BABYLON.Vector3(-5, 3, 0) }
        ]
      }
    ];
    for (let arr of this.arrayList) {
      for (let spk of arr.speakerList) {
        spk.path = this.publicPath + "speakermodule.obj";
        spk.scale = new BABYLON.Vector3(0.005, 0.005, 0.005);
      }
    }
  }

  // onSpeaker(event: any) {
  //   this.watchSpeaker = event.entity;
  //   console.log("onSpeaker: ", event);
  //   // console.log("speaker: ", this.watchSpeaker);
  // }

  // onArray(event: any) {
  //   console.log("onArray: ", event);
  //   // console.log("speaker: ", this.watchSpeaker);
  // }

  // @Watch("watchSpeaker", { deep: true })
  // speakerLoaded(loadedSpeaker: any) {
  //   console.log("@Watch speakerLoaded: ", loadedSpeaker);
  //   var mesh = loadedSpeaker;
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
