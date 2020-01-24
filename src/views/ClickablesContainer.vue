<template>
  <div class="clickables">
    <h1>Load clickable 3D meshes and generate events</h1>
    <Clickables></Clickables>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Clickables from "@/components/Clickables.vue";

@Component({
  components: {
    Clickables
  }
})
export default class ClickablesContainer extends Vue {}
</script>