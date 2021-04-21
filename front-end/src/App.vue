<template>
  <div id="app">
    
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';


export default {
  name: 'App',
  components: {
    Footer

  }
  
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.module-wrap {
  width: 90%;
  margin: 0 auto;
  background-color: #86c232;
  margin-bottom: 20px;
}

.module-content {
  padding: 20px;
}
.large-textarea {
  display: block;
  width: 75%;
  height: 200px;
  font-size: 20px;
  margin: 0 auto;
  margin-bottom: 10px;
  
}

.large-input {
  display: block;
  width: 400px;
  margin: 0 auto;
  font-size: 25px;

  
}

</style>
