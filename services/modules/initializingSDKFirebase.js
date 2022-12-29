const { initializeApp, cert } = require('firebase/app');

function initializingSDKFirebase() {
  initializeApp({
    apiKey: "AIzaSyCzlvOetOR61UQKeMWUo5BEALeEeOQpG1g",
    authDomain: "fixed-72bee.firebaseapp.com",
    databaseURL: "https://fixed-72bee-default-rtdb.firebaseio.com",
    projectId: "fixed-72bee",
    storageBucket: "fixed-72bee.appspot.com",
    messagingSenderId: "694333097391",
    appId: "1:694333097391:web:6cd344d66c1024f5e1db5a",
    measurementId: "G-XDPCL26T3L"
  });
}

module.exports = initializingSDKFirebase
