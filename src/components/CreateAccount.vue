<template>
  <div class="createUser">
    <h1 class="title">Create an Account</h1>
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
        <a class="button is-primary loginButton" @click="createUser">Create Account</a>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'CreateAccount',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    createUser () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => alert('user successfully created!'))
        .then(() => this.$router.push({name: 'Main'}))
        .catch(err => alert(err.message))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 550px;
  display: inline-block;
}
</style>
