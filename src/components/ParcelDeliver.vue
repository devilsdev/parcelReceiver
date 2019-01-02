<template>
  <div class="deliverView">
  <h1 class="title">Deliver parcel</h1>
  <div class="wrapper">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
         {{ parcel.parcelno }} 
        </p>
      </header>
      <div class="card-content">
        <div class="content">
         <b> Sender: </b> {{ parcel.sender }} 
        </div>
        <div class="content">
          <b> Receiver: </b> {{ parcel.receiver }}
        </div>
        <div class="content">
          <b> Comment: </b> {{ parcel.comment }}
        </div>
        <div class="content">
          <b>Received: </b> {{ parcel.created.toDate().toLocaleString() }}
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item" @click="toggleConfirm">Deliver Parcel</a>
      </footer>
    </div>
  </div>
  
  <transition name="fade">
    <notification v-if="showSuccess" infotext="Parcel successfully delivered" />
  </transition>

  <div ref="confirmModal" class="modal">
  <div class="modal-background"></div>
  <div class="modal-content">
    <h1 class="title confirmTitle">Deliver this Parcel?</h1>
    <button class="button is-danger" @click="deliverParcel(parcel)">Deliver</button>
  </div>
  <button class="modal-close is-large" aria-label="close" @click="toggleConfirm"></button>
  </div>

  </div>
</template>

<script>
import { firestore } from '../main.js'
import Notification from './Notification.vue'
export default {
  name: 'ParcelDeliver',
  components: {
    'notification': Notification
  },
  data () {
    return {
      parcel: this.$route.params.parcel,
      showSuccess: false
    }
  },
  methods: {
    deliverParcel (parcel) {
      parcel.status = 'delivered'
      parcel.created = new Date()
      let parcelRef = firestore.collection('parcels').doc(parcel.id)
      parcelRef.set(parcel)
      .then(() => {
        // go to main
        this.$router.push({name: 'Main'})
      })
      .catch(err => console.log(err))
    },
    toggleConfirm () {
      this.$refs.confirmModal.classList.toggle('is-active')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.deliverView {
  padding: 2vw;
}
.wrapper{
  width: 40vw;
  min-width: 350px;
  display: inline-block;
  text-align: left;  
}
.confirmTitle {
  color: white;
}
</style>
