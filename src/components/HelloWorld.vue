<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Scene>
      <Camera type="arcRotate" :alpha="20" :beta="-15" :radius="70" :position="[100, 100, 100]"></Camera>
      <HemisphericLight diffuse="#000"></HemisphericLight>

      <Asset :src="publicPath+'stage.obj'"></Asset>

      <Entity>
        <DirectionalLight specular="#0F0" diffuse="000" :direction="[0,0,-1]"></DirectionalLight>
        <Asset :src="publicPath+'speaker.obj'" :position="[0,5,0]"></Asset>
      </Entity>
    </Scene>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import vb from "vue-babylonjs";
Vue.use(vb);

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private publicPath: string;

  constructor() {
    super();
    this.publicPath = `${process.env.BASE_URL}`;
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
