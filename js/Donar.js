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
// ---------------------Creating a new user----------------------------------------

function submit_data(){
    var username=document.getElementById('username').value;
    var email=document.getElementById('mailid').value;
    var number1=document.getElementById('number1').value;
    var number2=document.getElementById('number2').value;
    var password=document.getElementById('password1').value;
    var password2=document.getElementById('password2').value;
      


    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // var user = userCredential.user;
    var id=firebase.auth().currentUser.uid;
    firebase.database().ref('DonarsData/'+id).set({
        UserID:id, 
        Name:username,
        Email:email,
        Mobile_Number:number1,
        Confirm_Number:number2,
        Password:password,
        Confirm_Password:password2
        }).then((info)=>{
            firebase.auth().currentUser.sendEmailVerification()
                        .then(() => {
                          $.bootstrapGrowl("Email verification sent to."+email, { type: 'success' });
                          setTimeout(function(){
                            window.location.href = 'Donar_login.html';
                        }, 2000);
                          })
                                 });

              

})
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    $.bootstrapGrowl("User already registred"+errorCode, {
      type: 'info',
      align: 'left',
      stackup_spacing: 30
  });


});
    
}
// Signing with existing user
function login_donar()
{
  var email=document.getElementById('email').value;
  var password=document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    $.bootstrapGrowl("Successfull Login", { type: 'success' });
   setTimeout(function(){
     window.location.assign("fooddonate.html");
   },1000)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    $.bootstrapGrowl(errorCode, {
      type: 'danger',
      align: 'left',
      width: 'auto',
      allow_dismiss: false
  });

  });
}