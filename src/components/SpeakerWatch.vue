<template>
  <div>
    <Asset
      :src="speaker.path"
      :scaling="speaker.scale"
      :position="speaker.positionV"
    ></Asset>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { ISpeakerModel } from '@/components/types.ts';
import { Asset } from 'vue-babylonjs';
import { Vector3 } from 'vue-babylonjs/classes';

@Component
export default class SpeakerWatch extends Vue {
  @Prop() private readonly speaker!: ISpeakerModel;
  @Prop() private readonly scene!: any;
  private speakerPosition!: Vector3;

  private speakerAsset!: any;

  constructor() {
    super();
    this.speakerAsset = null;
    this.speakerPosition = new BABYLON.Vector3(4, 5, 3);
  }

  get speakerStateComputed(): Vector3 {
    console.log('computed speakerState: ', this.speaker.positionV);
    return this.speaker.positionV;
  }
  // onAsset(asset: any) {
  //   console.log("Scene:", this.scene);
  //   console.log("Asset: ", asset);
  // }

  @Watch('speaker', { immediate: true, deep: true })
  speakerHandler(loadedSpeaker: ISpeakerModel) {
    //speakerAsset = loadedSpeaker;
    this.speakerPosition = new Vector3(loadedSpeaker.positionV);
    console.log('speakerPosition', this.speakerPosition);
    console.log(
      'Speaker ID: ---- ' + loadedSpeaker.id + ' | this: ' + this.speaker.id
    );
    console.log(
      'Position: ---- ' +
        loadedSpeaker.positionV +
        ' | this: ' +
        this.speaker.positionV
    );
  }

  // @Watch('speakerAsset')
  // speakerAssetHandler(vmodelSpeakerAsset: ISpeakerModel) {
  //   console.log(
  //     'V-model id : ' +
  //       this.speakerAsset.id +
  //       ' | pos: ' +
  //       this.speakerAsset.position
  //   );
  //   //this.speakerClicked(loadedSpeaker);
  // }

  // speakerClicked(speakerInfo: ISpeakerModel) {
  //   //console.log("Parent scene: ", this.scene);
  //   var mesh1 = this.speakerAsset;
  //   mesh1.actionManager = new BABYLON.ActionManager(this.scene);
  //   mesh1.actionManager.registerAction(
  //     new BABYLON.ExecuteCodeAction(
  //       BABYLON.ActionManager.OnPickTrigger,
  //       function() {
  //         alert(
  //           'Speaker ID: --------- ' +
  //             speakerInfo.id +
  //             '| Position: ----------- ' +
  //             speakerInfo.position
  //         );
  //       }
  //     )
  //   );
  // }
}
</script>
