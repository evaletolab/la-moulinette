<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Sharedb/>
  </div>
</template>

<script>
// @ is an alias to /src
import Sharedb from '@/components/Sharedb.vue';

export default {
  name: 'Home',
  data: function(){
    return {
      vis:true
    };
  },
  components: {
    Sharedb,
  },
  mounted(){
    console.log("we are mounted", this.vis);
    setInterval(() => {
      this.vis = !this.vis;
    }, 1000);
  }
}
</script>
