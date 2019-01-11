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
    <span class="parcel-count">Parcel´s overall: {{ filteredParcels.length }}</span>
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
        <tr v-for="parcel in filteredParcels" :key="parcel.id">
          <td> {{parcel.parcelno}} </td>
          <td> {{parcel.sender}} </td>
          <td> {{parcel.receiver}} </td>
          <td> {{parcel.comment}} </td>
          <td> 
            <template v-if="parcel.status === 'received'">
              <font-awesome-icon icon="arrow-down" class="item-received"/>
            </template>
            <template v-if="parcel.status === 'delivered'">
              <font-awesome-icon icon="arrow-up" class="item-delivered"/>
            </template>
            {{parcel.status}} 
          </td>
          <td> {{parcel.created.toDate().toLocaleString()}} </td>
          <td>
            <font-awesome-icon icon="trash-alt" class="action-icons" @click="toggleConfirm(parcel.id)"/> 
            <template v-if="parcel.status !== 'delivered'">
              | <font-awesome-icon icon="arrow-up" class="action-icons" @click="goToDeliverPage(parcel)"/>
            </template>
          </td>
        
        </tr>
      </tbody>
    </table>

  <div ref="confirmModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <h1 class="title confirmTitle">Delete this Parcel?</h1>
      <button class="button is-danger" @click="deleteParcelFromFirestore(currentParcelId)">Delete</button>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="toggleConfirm"></button>
  </div>

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
      filterOption: 'parcelno',
      currentParcelId: ''
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
    deleteParcelFromFirestore () {
      firestore.collection('parcels').doc(this.currentParcelId).delete()
        .then(() => console.log('parcel deleted successfully!'))
        .catch(err => console.log(err))

      this.$refs.confirmModal.classList.toggle('is-active')
      this.currentParcelId = ''
      this.parcels = this.getParcelsFromFirestore()
    },
    goToDeliverPage(parcel) {
      this.$router.push({ name: 'Deliver', params: {parcel: parcel} })
    },
    toggleConfirm (parcelId) {
      this.currentParcelId = parcelId
      this.$refs.confirmModal.classList.toggle('is-active')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchinput {
  width: 40%;
  min-width: 200px;
  padding-left: 1vw;
}
.parcel-count {
  float: left; 
  font-style: oblique;
  padding-left: 1vw;
}
.action-icons:hover{
  color: hsl(348, 100%, 61%)
}
.item-received {
  color: hsl(171, 100%, 41%);
}
.item-delivered {
  color: hsl(204, 86%, 53%);
}
.confirmTitle {
  color: white;
}
</style>
