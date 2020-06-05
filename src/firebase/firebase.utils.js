 import firebase from 'firebase/app';
 import 'firebase/firestore';
 import 'firebase/auth';
     

 const config = {
    apiKey: "AIzaSyDnqRWnvNrFM1b-MDoRL0UjNF1VAOMgP4Y",
    authDomain: "shopping-db-a1614.firebaseapp.com",
    databaseURL: "https://shopping-db-a1614.firebaseio.com",
    projectId: "shopping-db-a1614",
    storageBucket: "shopping-db-a1614.appspot.com",
    messagingSenderId: "660241686355",
    appId: "1:660241686355:web:54a9b77db3347d041f4ba6",
    measurementId: "G-KLL1CYRM63"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
         await userRef.set({
           displayName,
           email,
           createdAt,
           ...additionalData
         });
      }catch(error){
        console.log('error creating user',error.message);
      }
    }

    return userRef;
  };



  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;  