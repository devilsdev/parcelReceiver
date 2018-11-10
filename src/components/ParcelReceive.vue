<template>
  <div class="hello">
    <h1 class="title">Receive Parcel</h1>

    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="Parcel Code" v-model="parcelcode">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="Sender" v-model="sender">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="Receiver" v-model="receiver">
      </div>
    </div>

    <a class="button is-success" @click="addParcel">Add Parcel</a>

    <div class="select">
      <select v-model="comment">
        <option disabled value="">Please select a comment</option>
        <option>Parcel ok</option>
        <option>Parcel damaged</option>
        <option>No sender</option>
        <option>No receiver</option>
      </select>
    </div>

    <div 
      class="notification is-success" 
      style="position: fixed; bottom: 0; margin-bottom: 20px;width: 100%;" 
      v-if="showSuccess"
    >Parcel successfully added
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'
import { firestore} from "../main.js"
export default {
  name: 'HelloWorld',
  data () {
    return {
      parcelcode: '',
      sender: '',
      receiver: '',
      comment: '',
      showSuccess: false
    }
  },
  methods: {
    addParcel () {
      if (this.parcelcode == '' || this.sender == '' || this.receiver == '') {
        alert('Please fill in all fields')
        return
      }
      firestore.collection('parcels').add({
        parcelno: this.parcelcode,
        sender: this.sender,
        receiver: this.receiver,
        comment: this.comment,
        status: 'received',
        created: new Date()
      })
      .then(docRef => {
        this.showSuccessMessage()
        this.parcelcode = ''
        this.sender = ''
        this.receiver = ''
      })
      .catch(err => alert(err.message))
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
