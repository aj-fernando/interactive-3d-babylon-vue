<template>
  <Asset
    v-model="selectedSpeaker"
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
  private selectedSpeaker!: any;

  constructor() {
    super();
    this.selectedSpeaker = null;
  }

  @Watch("speaker", { immediate: true, deep: true })
  speakerHandler(loadedSpeaker: ISpeakerModel) {
    console.log("Speaker ID:" + loadedSpeaker.id + " modified");
    console.log("Speaker position: " + loadedSpeaker.position);
    console.log("this.speaker.position: " + this.speaker.position);
    //this.speaker.position = loadedSpeaker.position;
    this.speakerClicked(loadedSpeaker);
  }

  speakerClicked(speakerInfo: ISpeakerModel) {
    console.log("Parent scene: ", this.scene);
    var mesh1 = this.selectedSpeaker;
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