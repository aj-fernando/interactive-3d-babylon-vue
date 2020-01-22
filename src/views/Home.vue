<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/vue.png">
    <img alt="Babylon logo" src="../assets/babylon.png">
    <HelloWorld msg="Interactive 3D space created with Vue + Babylon JS"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
