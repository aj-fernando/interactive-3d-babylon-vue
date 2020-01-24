<template>
  <div>
    <Scene @complete="complete" @before-render$="beforeRender" @after-render$="++frames">
      <Camera type="arcRotate" :position="[5, 10, -10]"></Camera>
      <PointLight :position="[0, 2, -1]"></PointLight>

      <Box v-model="box1" :scaling="scale.box" :position="[0, 0, 5]">
        <Material diffuse="#F00"></Material>
      </Box>

      <Sphere :position="[2, 0, 5]" @entity="onSphere" :scaling="scale.sphere">
        <Material diffuse="#FB0"></Material>
      </Sphere>
    </Scene>

    <h3>{{ `Frames: ${frames}` }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import vb from "vue-babylonjs";
Vue.use(vb);

@Component
export default class Observables extends Vue {
  private box1!: any;
  private sphere1!: any;
  private time: number;
  private frames: number;

  constructor() {
    super();
    this.time = performance.now();
    this.frames = 0;
    this.box1 = null;
    this.sphere1 = null;
  }

  beforeRender() {
    this.time = performance.now();
  }

  onSphere(event: any) {
    console.log("onSphere", event);
    // the entity event includes entity reference
    this.sphere1 = event.entity;
  }

  complete(event: any) {
    console.log("complete", event);
    console.log("box", this.box1);
    console.log("sphere", this.sphere1);
  }

  get scale() {
    let a = 2 + Math.cos(this.time * 0.001);
    let b = 2 + Math.sin(this.time * 0.001);
    return {
      box: [a, b, 1],
      sphere: [b, a, 1]
    };
  }
}
</script>