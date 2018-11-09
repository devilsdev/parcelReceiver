<template>
  <div class="hello">
    <h1>Parcel List</h1>
    <!--filter for the parcels-->
    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="Search for parcel..." v-model="searchInput">
      </div>
    </div>
    <p>Filter by: </p>
    <div class="select">
      <select v-model="filterOption">
        <option value="parcelno">Parcel Number</option>
        <option value="sender">Sender</option>
        <option value="receiver">Receiver</option>
        <option value="comment">Comment</option>
        <option value="status">Status</option>
      </select>
    </div>

    <hr>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th><abbr title="Position">Parcel Number</abbr></th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Comment</th>
          <th>Status</th>
          <th>Received</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="parcel in filteredParcels" :key="parcel.parcelno">
          <td> {{parcel.parcelno}} </td>
          <td> {{parcel.sender}} </td>
          <td> {{parcel.receiver}} </td>
          <td> {{parcel.comment}} </td>
          <td> {{parcel.status}} </td>
          <td> {{parcel.created.toDate().toISOString()}} </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { firestore } from '../main.js'
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
            parcels.push(doc.data())
          })
        })
        .catch(error => {
          console.log('Error getting documents: ', error)
        })
      return parcels
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
