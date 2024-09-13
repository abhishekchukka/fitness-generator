import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDKdnYKIA3JE5cCNKB4MIbrZvlHTA6TvFA",
  authDomain: "fullstackproj-cc5e3.firebaseapp.com",
  projectId: "fullstackproj-cc5e3",
  storageBucket: "fullstackproj-cc5e3.appspot.com",
  messagingSenderId: "954441095971",
  appId: "1:954441095971:web:abde0fe4c9206ca4f9ca96",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
