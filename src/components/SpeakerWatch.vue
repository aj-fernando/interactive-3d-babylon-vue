<template>
  <Asset
    v-model="speakerAsset"
    :src="speaker.path"
    :scaling="speaker.scale"
    :position="speaker.position"
  ></Asset>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { Vector3 } from "babylonjs";

interface ISpeakerModel {
  id: string;
  position: Vector3;
}

@Component
export default class SpeakerWatch extends Vue {
  @Prop() private speaker!: any;
  @Prop() private scene!: any;
  private speakerAsset!: any;

  constructor() {
    super();
    this.speakerAsset = null;
  }

  @Watch("speaker", { immediate: true, deep: true })
  speakerHandler(loadedSpeaker: ISpeakerModel) {
    console.log("Speaker ID:" + loadedSpeaker.id + " modified");
    console.log("Speaker position: " + loadedSpeaker.position);
    console.log("this.speaker.position: " + this.speaker.position);
    //this.speaker.position = loadedSpeaker.position;
    this.speakerClicked(loadedSpeaker);
  }

  @Watch("speakerAsset")
  speakerAssetHandler(loadedSpeaker: ISpeakerModel) {
    console.log("speakerAssetHandler");
    this.speakerClicked(loadedSpeaker);
  }

  speakerClicked(speakerInfo: ISpeakerModel) {
    console.log("Parent scene: ", this.scene);
    var mesh1 = this.speakerAsset;
    mesh1.actionManager = new BABYLON.ActionManager(this.scene);
    mesh1.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        function() {
          alert(
            "Clicked SpeakerID: " +
              speakerInfo.id +
              "| Pos: " +
              speakerInfo.position
          );
        }
      )
    );
  }
}
</script>