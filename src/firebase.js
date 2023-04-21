import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage  } from "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,

  apiKey: "AIzaSyCBKYGkgtk8FBIIc3tFRO6EjyiPA63Xm14",
  authDomain: "auth-development-c8320.firebaseapp.com",
  projectId: "auth-development-c8320",
  storageBucket: "auth-development-c8320.appspot.com",
  messagingSenderId: "815149310867",
  appId: "1:815149310867:web:e8afccf546f17f376bbe66"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const database = {
  folders: collection(firestore,'folders'),
  files : collection(firestore,'files'),
  formatDoc : doc=>{
    return {id : doc.id,...doc.data()}
  },
  getCurrentTimestamp : new Date(),
}
export const auth = getAuth(app);
export default app;