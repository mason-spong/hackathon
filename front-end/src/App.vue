<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

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

</style>
