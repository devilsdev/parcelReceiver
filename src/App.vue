<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import firebase from 'firebase'
export default {
  name: 'App',
  components: {
    'navbar': Navbar
  },
  created () {
    // to handle auth if the user refreshes the app
    firebase.auth().onAuthStateChanged(user => {
      if(user)
        this.$store.commit('changeAuthenticated', true)
      else
        this.$store.commit('changeAuthenticated', false)
    })
  }
}
</script>

<style>
html, body{
  margin:0;
  padding:0;
  background-color: rgb(250, 250, 250);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
