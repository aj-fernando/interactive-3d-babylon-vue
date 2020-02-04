<template>
  <div>
    <Asset
      v-model="speakerAsset"
      :src="speaker.path"
      :scaling="speaker.scale"
      :position="speaker.position"
    ></Asset>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import "babylonjs-loaders";

interface ISpeakerModel {
  id: string;
  position: BABYLON.Vector3;
  scale?: BABYLON.Vector3;
  path?: string;
}

@Component
export default class SpeakerWatch extends Vue {
  @Prop() private speaker!: any;
  @Prop() private scene!: any;
  private speakerAsset!: any;
  private _loadedMeshes!: BABYLON.Mesh[];
  private meshPath!: string;
  constructor() {
    super();
    this.speakerAsset = null;
    this.meshPath = `${process.env.BASE_URL}` + "skull.babylon";
  }

  // onAsset(asset: any) {
  //   console.log("Scene:", this.scene);
  //   console.log("Asset: ", asset);
  // }

  @Watch("speaker", { immediate: true, deep: true })
  speakerHandler(loadedSpeaker: ISpeakerModel) {
    console.log(
      "Speaker ID: ---- " + loadedSpeaker.id + " | this: " + this.speaker.id
    );
    console.log(
      "Position: ---- " +
        loadedSpeaker.position +
        " | this: " +
        this.speaker.position
    );

    console.log(this.meshPath);

    BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;
    BABYLON.OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY = false;

    BABYLON.SceneLoader.ImportMesh(
      "",
      "",
      "speakermodule.obj",
      this.scene,
      function(this: any, newMeshes: any) {
        this.scene.createDefaultCameraOrLight(true, true, true);
        this.scene.createDefaultEnvironment();
        newMeshes[0].position.y = -10;
        // Set the target of the camera to the first imported mesh
        //this.scene.getCameraByID("Camera").target = newMeshes[0];
        // for (let mesh in newMeshes) {
        //   newMeshes[mesh].scaling = new BABYLON.Vector3(1, 1, 1);
        //   newMeshes[mesh].position = new BABYLON.Vector3(4, 4, 4);
        // }
      }
      // function(newMeshes) {
      //   for (let mesh in newMeshes) {
      //     console.log("mesh: ", mesh);
      //     // newMeshes[mesh].scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
      //     // newMeshes[mesh].position = loadedSpeaker.position;
      //   }
      // }
    );
    // loadedMeshes => {
    //   loadedMeshes.forEach(loadedMesh => {
    //     console.log(`loaded '${loadedMesh.name}'`, loadedMesh);
    //     this._loadedMeshes.push(<BABYLON.Mesh>loadedMesh);
    //   });
    // }
  }

  @Watch("speakerAsset")
  speakerAssetHandler(loadedSpeaker: ISpeakerModel) {
    this.speakerClicked(loadedSpeaker);
  }

  speakerClicked(speakerInfo: ISpeakerModel) {
    //console.log("Parent scene: ", this.scene);
    var mesh1 = this.speakerAsset;
    mesh1.actionManager = new BABYLON.ActionManager(this.scene);
    mesh1.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function() {
          alert(
            "Speaker ID: --------- " +
              speakerInfo.id +
              "| Position: ----------- " +
              speakerInfo.position
          );
        }
      )
    );
  }
}
</script>