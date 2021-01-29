<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Sharedb/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Sharedb from '@/components/Sharedb.vue';

export default {
  name: 'Home',
  data: function(){
    return {
      vis:true
    };
  },
  components: {
    HelloWorld,
    Sharedb,
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
