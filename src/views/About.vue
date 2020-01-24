<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Playground></Playground>
  </div>
</template>


<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import Playground from "@/components/Playground.vue"

@Component ({
  components: {
    Playground,
  }
})
export default class About extends Vue {
}
</script>