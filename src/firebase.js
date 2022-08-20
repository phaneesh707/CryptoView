import firebaseConfig from "./config/firebaseConfig";
import { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseapp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseapp);
const db = getFirestore(firebaseapp)

export {auth,db}