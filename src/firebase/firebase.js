import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./config";


class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig);
        this.db = app.firestore();
    }
}

const firebase = new Firebase();
//console.log("firebse Log", firebase);
export default firebase;