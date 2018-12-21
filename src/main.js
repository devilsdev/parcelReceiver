// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import './../node_modules/bulma/css/bulma.css'
import { store } from './store'
import { config } from './firebaseConfig'

// font awesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faBox } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTrashAlt)
library.add(faBox)
library.add(faSignOutAlt)
library.add(faArrowDown)
library.add(faArrowUp)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// define app
let app

// Initialize Firebase
// you have to add your own firebase config here, mine is kept out of this repository
firebase.initializeApp(config)

export const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      store,
      template: '<App/>'
    })
  }
})