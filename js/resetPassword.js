var firebaseConfig = {
  apiKey: "AIzaSyCiwRB95jhV5hfffWWkSAkp71gmca7JvYE",
  authDomain: "project-156e1.firebaseapp.com",
  projectId: "project-156e1",
  storageBucket: "project-156e1.appspot.com",
  messagingSenderId: "917796092304",
  appId: "1:917796092304:web:f7a88449d2085546429b15",
  measurementId: "G-YP1KHPCF7X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

  function reset_pass(){

    var email=document.getElementById('resetpassword').value;
    firebase.auth().sendPasswordResetEmail(email)
  .then((info) => {
    $.bootstrapGrowl("Email sent "+email, { type: 'success' });
    setTimeout(function(){
        window.location.href = 'contact.html';
    }, 1500);
      })
  .catch((error) => {
    $.bootstrapGrowl("Email is not registered!!", {
        type: 'danger',
        align: 'left',
        width: 'auto',
        allow_dismiss: false
    });  
    
  });
}