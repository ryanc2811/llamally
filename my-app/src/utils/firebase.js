import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig={
    apiKey: "AIzaSyCt7QhHd86PdslmxtAqgTsqX1ps2DL-3UM",

  authDomain: "llamally-78b73.firebaseapp.com",

  projectId: "llamally-78b73",

  storageBucket: "llamally-78b73.appspot.com",

  messagingSenderId: "155896217135",

  appId: "1:155896217135:web:15f97cdc8cd1268e9650da",

  measurementId: "G-64Z8HH35ZR"
}

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;