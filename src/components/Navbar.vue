<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" @click="goHome">
          ParcelReceiver
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <template v-if="$store.getters.authenticated">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary" @click="goToReceiveParcel">
                  Receive Parcel
                </a>
              </div>
            </div>
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-info" @click="goToDeliverParcel">
                  Deliver Parcel
                </a>
              </div>
            </div> 
          </template>
        </div>
        <div class="navbar-end">
          <div class="navbar-item" v-if="$store.getters.authenticated">
              <div class="buttons">
                  <a class="button is-light" @click="logoutUser">
                    Logout 
                  </a>
              </div>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
import firebase from 'firebase'
import { firestore } from '../main.js'
export default {
  name: 'Navbar',
  methods: {
    logoutUser () {
      firebase.auth().signOut().then(user => {
        this.$store.commit('changeAuthenticated', false)
        this.$router.replace('login')
      })
    },
    goToReceiveParcel () {
      this.$router.replace('parcelreceive')
    },
    goToDeliverParcel () {
      this.$router.replace('parceldeliver')
    },
    goHome () {
      this.$router.replace('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
