const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('./fixed-72bee-firebase-adminsdk-gqmb6-aa5ea9b276.json');

function initializingSDKFirebase() {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'gs://fixed-72bee.appspot.com/'
  });
}

module.exports = initializingSDKFirebase
