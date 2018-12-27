<template>
  <div class="deliverView">
    
    <h1 class="title">Deliver parcel</h1>

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
        <a href="#" class="card-footer-item" @click="deliverParcel(parcel)">Deliver Parcel</a>
      </footer>
    </div>

    <notification v-if="showSuccess" infotext="Parcel delivered successfully" />

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
        console.log(`parcel with id ${parcel.id} successfully updated`)
        this.showSuccessMessage()
        // go to main
        this.$router.push({name: 'Main'})
      })
      .catch(err => console.log(err))
    },
    showSuccessMessage () {
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  },
mounted () {
  console.log(this.parcel)
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.deliverView {
  text-align: left;
  padding: 2vw;
}
</style>
