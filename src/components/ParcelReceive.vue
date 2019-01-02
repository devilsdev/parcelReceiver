<template>
  <div class="hello">
    <h1 class="title">Receive Parcel</h1>

    <div class="cardWrapper">
      <div class="card has-text-centered is-wide">
        <div class="field elementWrapper">
          <div class="control">
              <input class="input" type="text" placeholder="Parcel Code" ref="test" v-model="parcelcode">
            </div>
        </div>

        <div class="field elementWrapper">
          <div class="control">
            <input class="input" type="text" placeholder="Sender" v-model="sender">
          </div>
        </div>

        <div class="field elementWrapper">
          <div class="control">
            <input class="input" type="text" placeholder="Receiver" v-model="receiver" v-on:keypress.enter="addParcel">
          </div>
        </div>

        <a class="button is-primary controlWrapper" @click="addParcel">Add Parcel</a>

        <div class="select controlWrapper">
          <select v-model="comment">
            <option disabled value="">Select a comment</option>
            <option>Parcel ok</option>
            <option>Parcel damaged</option>
            <option>No sender</option>
            <option>No receiver</option>
          </select>
        </div>
      </div>
    </div>
    
    
    <transition name="fade">
      <notification v-if="showSuccess" infotext="Parcel successfully added" />
    </transition>

  </div>
</template>

<script>
import firebase from 'firebase'
import { firestore} from "../main.js"
import Notification from './Notification.vue'
export default {
  name: 'ParcelReceive',
  components: {
    'notification': Notification
  },
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
      if (this.parcelcode === '' || this.sender === '' || this.receiver === '') {
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
        console.log(`parcel with id ${docRef.id} successfully added`)
        // show success to the user
        this.showSuccessMessage()
        // empty all the input fields
        this.parcelcode = this.sender = this.receiver = ''
      })
      .catch(err => console.log(err.message))
    },
    showSuccessMessage () {
      this.showSuccess = true
      window.setTimeout(() => this.showSuccess = false, 2000)
    }
  },
  mounted () {
    this.$refs.test.focus()
  }
}
</script>

<style scoped>
.card {
  width: 50vw;
  display: inline-block;
}
.elementWrapper {
  margin: 2vh;
}
.controlWrapper {
  margin-bottom: 2vh;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

