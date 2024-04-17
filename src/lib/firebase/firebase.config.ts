import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQMZOa7-K9ggxGIB43VbYSC3rv4bUNV30",
  authDomain: "paggo-take-home-case.firebaseapp.com",
  projectId: "paggo-take-home-case",
  storageBucket: "paggo-take-home-case.appspot.com",
  messagingSenderId: "719012327465",
  appId: "1:719012327465:web:d1d9b98fe7a790b958ec38",
  measurementId: "G-0FH6B7L4FS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
