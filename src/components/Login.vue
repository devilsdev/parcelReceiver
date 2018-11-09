<template>
  <div class="hello">
    <div class="cardWrapper">
      <div class="card has-text-centered is-wide login">
        <label class="label">E-Mail</label>
        <div class="control">
          <input class="input" type="text" placeholder="E-Mail" v-model="email">
        </div>
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="Password" v-model="password" v-on:keypress.enter="loginUser">
        </div>
        <a class="button is-primary" @click="loginUser">Login</a>
      </div>
    </div>

    <article class="message is-primary fitBottom">
      <div class="message-header">
        <p>Welcome</p>
      </div>
      <div class="message-body">
        Welcome to ParcelReceiver! with ParcelReceiver you can keep track of your parcels.
      </div>
    </article>

  </div>
</template>

<script>
import { store } from '../main.js'
import firebase from 'firebase'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginUser () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace('main')
          this.$store.commit('changeAuthenticated', true)
        })
        .catch(err => alert(err.message))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.card {
  width: 550px;
  display: inline-block;
}

.cardWrapper {
  text-align: center;
}

.login{
  margin-top: 60px;
}

.fitBottom{
  padding-top: 20%;
}
</style>
