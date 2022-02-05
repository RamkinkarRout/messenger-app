import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDNrZyGiySHW7uSyBwATLmpE5h_VjDltoM",

  authDomain: "messenger-chat-app-78280.firebaseapp.com",

  databaseURL: "https://messenger-chat-app-78280-default-rtdb.firebaseio.com",

  projectId: "messenger-chat-app-78280",

  storageBucket: "messenger-chat-app-78280.appspot.com",

  messagingSenderId: "602667864744",

  appId: "1:602667864744:web:e5b1fd29de84bd28a4289d",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
