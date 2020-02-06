import * as BABYLON from 'babylonjs';
import { Vector3 } from 'vue-babylonjs/classes';

export interface ISpeakerModel {
  id: string;
  positionV: Vector3;
  scale?: BABYLON.Vector3;
  path?: string;
}
