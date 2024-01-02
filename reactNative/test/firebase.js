// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log('nicee')
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCujYDC4RBSsnd_cjvpDoPJ11-fq_MmWVI",
  authDomain: "test-d940b.firebaseapp.com",
  projectId: "test-d940b",
  storageBucket: "test-d940b.appspot.com",
  messagingSenderId: "1066928509398",
  appId: "1:1066928509398:web:33416670269e6ec4d6d477",
  measurementId: "G-P1QHLY0HFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app

