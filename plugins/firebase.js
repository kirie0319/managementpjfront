import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyDfFBtspECoKPm7KP81kttYVdbiwwsSgdI",
      authDomain: "managementpj-c26d4.firebaseapp.com",
      projectId: "managementpj-c26d4",
      storageBucket: "managementpj-c26d4.appspot.com",
      messagingSenderId: "683794867706",
      appId: "1:683794867706:web:b10706f41b5c947d35f043",
      measurementId: "G-Y6D3TXZ5YN"
    }
  )
}
  
export default firebase