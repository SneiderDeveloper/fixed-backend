// const admin = require("firebase-admin")
const serviceAccount = require('./fixed-72bee-firebase-adminsdk-gqmb6-aa5ea9b276.json')

function initializingSDKFirebase() {

  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   storageBucket: "fixed-72bee.appspot.com",
  // });

  console.log('init')

  // const firebaseConfig = {
  //   apiKey: "AIzaSyCzlvOetOR61UQKeMWUo5BEALeEeOQpG1g",
  //   authDomain: "fixed-72bee.firebaseapp.com",
  //   databaseURL: "https://fixed-72bee-default-rtdb.firebaseio.com",
  //   projectId: "fixed-72bee",
  //   storageBucket: "fixed-72bee.appspot.com",
  //   messagingSenderId: "694333097391",
  //   appId: "1:694333097391:web:6cd344d66c1024f5e1db5a",
  //   measurementId: "G-XDPCL26T3L"
  // }
  // const app = initializeApp(firebaseConfig)
  // const storage = getStorage(app);

// function initializingSDKFirebase() {
//   initializeApp({
//     apiKey: "AIzaSyCzlvOetOR61UQKeMWUo5BEALeEeOQpG1g",
//     authDomain: "fixed-72bee.firebaseapp.com",
//     databaseURL: "https://fixed-72bee-default-rtdb.firebaseio.com",
//     projectId: "fixed-72bee",
//     storageBucket: "fixed-72bee.appspot.com",
//     messagingSenderId: "694333097391",
//     appId: "1:694333097391:web:6cd344d66c1024f5e1db5a",
//     measurementId: "G-XDPCL26T3L"
//   });
}

module.exports = initializingSDKFirebase
