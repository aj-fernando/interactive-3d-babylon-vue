<template>
  <div class="observables">
    <h1>Interact with BabylonJS objects using Observables</h1>
    <Observables></Observables>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Observables from "@/components/Observables.vue";

@Component({
  components: {
    Observables
  }
})
export default class ObservablesContainer extends Vue {}
</script>