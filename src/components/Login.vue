<template>
  <div class="login">
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
        <a class="button is-primary loginButton" @click="loginUser">Login</a>
      </div>
      <div class="createAcc">
        Don´t have an Account yet? <a href="#" @click="routeToCreateAccount">Create one</a>
      </div>
      
    </div>

    <article class="message is-primary fitBottom">
      <div class="message-header">
        <p>Welcome</p>
      </div>
      <div class="message-body">
        Welcome to ParcelReceiver! with ParcelReceiver you can keep track of your parcels.
      </div>
      <span>made by <a href="https://github.com/devilsdev">devilsdev</a> with <font-awesome-icon icon="beer" /> </span>
    </article>

  </div>
</template>

<script>
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
    },
    routeToCreateAccount () {
      this.$router.push({name: 'CreateAccount'})
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

.cardWrapper {
  text-align: center;
}

.login{
  margin-top: 60px;
}

.fitBottom{
  padding-top: 20%;
}

.loginButton {
  margin: 1vh;
}
.createAcc {
  margin: 1vh;
}
</style>
