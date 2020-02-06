<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <template v-if="mainScene">
      <div v-for="array in arrayList" :key="'TXT' + array.id">
        <div v-for="speaker in array.speakerList" :key="speaker.id">
          {{ speaker.id }}
          <input type="text" v-model="speaker.positionV" />
        </div>
      </div>
    </template>

    <Scene @scene="onScene">
      <Camera
        v-if="mainScene"
        type="arcRotate"
        :alpha="20"
        :beta="-15"
        :radius="70"
        :position="[100, 100, 100]"
      ></Camera>
      <HemisphericLight diffuse="#000"></HemisphericLight>

      <Asset v-if="mainScene" :src="publicPath + 'stage.obj'"></Asset>

      <span v-if="mainScene">
        <Entity v-for="array in arrayList" :key="'SW' + array.id">
          <SpeakerWatch
            :scene="mainScene"
            :speaker="speaker"
            v-for="speaker in array.speakerList"
            :key="speaker.id"
          ></SpeakerWatch>
        </Entity>
      </span>
    </Scene>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import vb from 'vue-babylonjs';
Vue.use(vb);
import SpeakerWatch from '@/components/SpeakerWatch.vue';
import { ISpeakerModel } from '@/components/types.ts';

interface IArrayModel {
  id: string;
  speakerList: ISpeakerModel[];
}

@Component({
  components: {
    SpeakerWatch
  }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private mainScene: any;

  private arrayList: IArrayModel[];

  private publicPath: string;

  constructor() {
    super();
    this.publicPath = `${process.env.BASE_URL}`;
    this.mainScene = null;

    this.arrayList = [
      {
        id: 'array1',
        speakerList: [
          { id: 'array1-speaker1', positionV: new BABYLON.Vector3(3, 6.1, 0) },
          { id: 'array1-speaker2', positionV: new BABYLON.Vector3(3, 3, 0) }
        ]
      },
      {
        id: 'array2',
        speakerList: [
          { id: 'array2-speaker1', positionV: new BABYLON.Vector3(-5, 6.1, 0) },
          { id: 'array2-speaker2', positionV: new BABYLON.Vector3(-5, 3, 0) }
        ]
      }
    ];
    for (let arr of this.arrayList) {
      for (let spk of arr.speakerList) {
        spk.path = this.publicPath + 'speakermodule.obj';
        spk.scale = new BABYLON.Vector3(0.005, 0.005, 0.005);
      }
    }
  }

  onScene(scene: any) {
    console.log('Scene: ', scene.cameras);
    this.mainScene = scene;
    console.log('mainScene: ', this.mainScene);
    scene.debugLayer.show();
  }
  //   BABYLON.SceneLoader.ImportMesh(
  //     "",
  //     this.publicPath + "speakermodule.obj",
  //     "",
  //     scene,
  //     function(newMeshes) {
  //       for (let mesh in newMeshes) {
  //         newMeshes[mesh].scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
  //         newMeshes[mesh].position = new BABYLON.Vector3(4, 4, 4);
  //       }
  //     }
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
