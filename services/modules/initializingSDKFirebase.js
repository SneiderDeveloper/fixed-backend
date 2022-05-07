const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('./fixed-72bee-3a386619e4db.json');

function initializingSDKFirebase() {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'gs://fixed-72bee.appspot.com/'
  });
}

module.exports = initializingSDKFirebase
