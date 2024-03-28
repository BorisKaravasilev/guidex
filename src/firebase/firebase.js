import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Git ignored API keys
const apiKeys = require('./api-keys');

const config =
  process.env.NODE_ENV === 'production'
    ? apiKeys.prodConfig
    : apiKeys.devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export { auth, db };
