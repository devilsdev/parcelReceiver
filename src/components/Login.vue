<template>
  <div class="login">
    <div class="cardWrapper">

      <div class="card has-text-centered is-wide login">
        <div class="elementWrapper">
        <label class="label innerElements">E-Mail</label>
          <div class="control" innerElements>
            <input class="input" type="text" placeholder="E-Mail" v-model="email">
          </div>
          <label class="label innerElements">Password</label>
          <div class="control" innerElements>
            <input class="input" type="password" placeholder="Password" v-model="password" v-on:keypress.enter="loginUser">
          </div>
          <a class="button is-primary innerElements" @click="loginUser">Login</a>
        </div>
      </div>

      <div class="createAcc">
        Don´t have an Account yet? <a href="#" @click="routeToCreateAccount">Create one</a>
      </div>
    </div>

    <div class="infoMessage">
      <article class="message">
        <div class="message-body">
          <h2 class="subtitle">What is ParcelReceiver?</h2>
          <p>
            Parcel receiver let´s you keep track of your <i>received</i> and <i>delivered</i> parcel´s. It is designed to 
            make life easier for small shops and businesses, who often <b>loose track</b> of their parcel´s.
          </p>
          <p>Register now to check it out! It´s lifetime free.</p>
          <p><br/>For any further questions you can <a href="mailto:maik.pleines@googlemail.com">Email Me.</a></p>
        </div>
      </article>
    </div>

    <span class="footerElement">made by <a href="https://github.com/devilsdev">devilsdev</a> with <font-awesome-icon icon="beer" /> </span>

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

.elementWrapper {
  margin: 2vh;
}

.login{
  margin-top: 60px;
}

.footerElement{
  background-color: white;
  height: 6vh;
  width: 100vw;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 2vh 0;
}

.createAcc {
  margin: 1vh;
}

.innerElements {
  margin-top: 1vh;
}

.infoMessage {
  width: 40vw;
  display: inline-block;  
  margin-top: 4vh;
}
</style>
