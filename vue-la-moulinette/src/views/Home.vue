<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloMoulinette v-bind:visible="vis" name="Moulinette"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HelloMoulinette from '@/components/HelloMoulinette.vue';

export default {
  name: 'Home',
  data: function(){
    return {
      vis:true
    };
  },
  components: {
    HelloWorld,
    HelloMoulinette
  },
  mounted(){
    console.log("we are mounted", this.vis);
    setInterval(() => {
      this.vis = !this.vis;
    }
      , 1000);
  }
}
</script>
