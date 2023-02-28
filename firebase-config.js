import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

const firebaseConfig = {
  apiKey: "AIzaSyBX0OdQ1gMlkzCWvyIidIerEpluacnyJwg",
  authDomain: "reactnativeform-f52ae.firebaseapp.com",
  databaseURL: "https://reactnativeform-f52ae-default-rtdb.firebaseio.com",
  projectId: "reactnativeform-f52ae",
  storageBucket: "reactnativeform-f52ae.appspot.com",
  messagingSenderId: "976258596362",
  appId: "1:976258596362:web:d9eec5193c613ff537a9f3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export { auth }






