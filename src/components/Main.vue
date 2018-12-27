<template>
  <div class="maincontent">
    <h1 class="title">Parcel List</h1>
    <!--filter for the parcels-->
    <div class="field has-addons">
      <div class="control searchinput">
        <input class="input" type="text" placeholder="Search for a parcel..." v-model="searchInput">
      </div>

      <div class="control searchoption">
        <div class="select">
          <select v-model="filterOption">
            <option value="parcelno">Parcel Number</option>
            <option value="sender">Sender</option>
            <option value="receiver">Receiver</option>
            <option value="comment">Comment</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>
    <hr>
    <span style="float: left; font-style: oblique;">Parcel´s overall: {{ filteredParcels.length }}</span>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th><abbr title="Position">Parcel Number</abbr></th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Comment</th>
          <th>Status</th>
          <th>Received / Delivered</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="parcel in filteredParcels" :key="parcel.parcelno">
          <td> {{parcel.parcelno}} </td>
          <td> {{parcel.sender}} </td>
          <td> {{parcel.receiver}} </td>
          <td> {{parcel.comment}} </td>
          <td> 
            <template v-if="parcel.status === 'received'">
              <font-awesome-icon icon="arrow-down" color="green"/>
            </template>
            <template v-if="parcel.status === 'delivered'">
              <font-awesome-icon icon="arrow-up" color="purple"/>
            </template>
            {{parcel.status}} 
          </td>
          <td> {{parcel.created.toDate().toLocaleString()}} </td>
          <td>
            <font-awesome-icon icon="trash-alt" class="action-icons" @click="deleteParcelFromFirestore(parcel.id)"/> 
            <template v-if="parcel.status !== 'delivered'">
              | <font-awesome-icon icon="arrow-up" class="action-icons" @click="goToDeliverPage(parcel)"/>
            </template>
          </td>
        
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { firestore } from '../main.js'
import { database } from 'firebase';
export default {
  name: 'Main',
  data () {
    return {
      parcels: this.getParcelsFromFirestore(),
      searchInput: '',
      filterOption: 'parcelno'
    }
  },
  computed: {
    filteredParcels () {
      return this.parcels.filter(parcel => {
        return parcel[this.filterOption].toLowerCase().includes(this.searchInput.toLowerCase())
      })
    }
  },
  methods: {
    getParcelsFromFirestore () {
      let parcels = []
      let parcelsRef = firestore.collection('parcels/')
      parcelsRef.orderBy('created', 'desc').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
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
    deleteParcelFromFirestore (parcelId) {
      if(confirm("Do you really want to delete this parcel?")) {
        firestore.collection('parcels').doc(parcelId).delete()
          .then(() => console.log('parcel deleted successfully!'))
          .catch(err => console.log(err))
        
        this.parcels = this.getParcelsFromFirestore()
      }
    },
    goToDeliverPage(parcel) {
      console.log('routing to delivery with parcel: ', parcel)
      this.$router.push({ name: 'Deliver', params: {parcel: parcel} })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchinput {
  width: 40%;
  min-width: 200px;
}

.action-icons:hover{color: red};
</style>
