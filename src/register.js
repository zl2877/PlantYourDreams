import { createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { auth,db} from "./firebase.js";
import { collection,addDoc,setDoc,doc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";


registerBtn.addEventListener('click',(e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        var lgDate = new Date();
        // ... user.uid
        alert(`User created successfully!`);
        
        try{
          const docRef = await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            lastLogin: lgDate,
            balance: 1000
          })
          //console.log("Document written with ID: ", docRef.id);
          window.location.assign("./index.html")
        }
        catch(error){
            console.error("Error adding user info: ", error);
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorCode);
    });


    // signOut(auth).then(() => {
    //     // Sign-out successful.
    // }).catch((error) => {
    //     // An error happened.
    // });
})
