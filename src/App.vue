<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss" src="./assets/sass/main.scss"></style>
<style lang="scss" src="./assets/sass/tooltip.scss"></style>
<style lang="scss">
#app {
  font-family: 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  padding-top: 2rem;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #333;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
