<template>
  <div class="hello">
    <h1 class="title">Deliver Parcel</h1>

    <div class="control searchinput">
      <input class="input" type="text" placeholder="Search for a parcel..." v-model="searchInput">
    </div>

    <div v-for="parcel in filteredParcels" :key="parcel.parcelno">
      <div class="notification">
        <p><strong>Parcel Number: </strong>{{ parcel.parcelno }}</p>
        <p><strong>Sender: </strong>{{ parcel.sender }}</p>
        <p><strong>Receiver: </strong>{{ parcel.receiver }}</p>
        <p><strong>Comment: </strong>{{ parcel.comment }}</p>
        <a class="button is-warning" @click="deliverParcel(parcel)">Deliver Parcel</a>
      </div>
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
      parcels: this.getReceivedParcels(),
      searchInput: '',
      selectedParcel: {},
      showSuccess: false
    }
  },
  computed: {
    filteredParcels () {
      return this.parcels.filter(parcel => {
        return parcel.parcelno.toLowerCase().includes(this.searchInput.toLowerCase())
      })
    }
  },
  methods: {
    getReceivedParcels () {
      let parcels = []
      let parcelsRef = firestore.collection('parcels/')
      parcelsRef.where('status', '==', 'received').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // TODO: this is some workaround, needs fix asap
            let parcel = doc.data()
            parcel.id = doc.id
            parcels.push(parcel)
          })
        })
        .catch(error => {
          console.log('Error getting documents: ', error)
        })
      return parcels
    },
    deliverParcel (parcel) {
      parcel.status = 'delivered'
      let parcelRef = firestore.collection('parcels').doc(parcel.id)
      parcelRef.set(parcel)
      .then(() => {
        console.log(`parcel with id ${parcel.id} successfully updated`)
        this.showSuccessMessage()
        // reload data on component
        this.parcels = this.getReceivedParcels()
      })
      .catch(err => console.log(err))
    },
    showSuccessMessage () {
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
