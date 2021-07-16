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

function create_user(){
    var Home_Name=document.getElementById('username').value;
    var email=document.getElementById('mailid').value;
    var Number=document.getElementById('number1').value;
    var Confirm_Number=document.getElementById('number2').value;
    var Password=document.getElementById('pass1').value;
    var Confirm_Password=document.getElementById('pass2').value;
    firebase.auth().createUserWithEmailAndPassword(email, Password)
  .then((userCredential) => {
    var id=firebase.auth().currentUser.uid;
    firebase.database().ref('OrphanageHomesData/'+id).set({
        UserId:id,
        Email:email,
        Home_Name:Home_Name,
        Number:Number,
        Confirm_Number:Confirm_Number,
        Password:Password,
        Confirm_Password:Confirm_Password
    }).then((info)=>{
        firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
                  $.bootstrapGrowl("Email verification sent to."+email, { type: 'success' });
                  setTimeout(function(){
                    window.location.href = 'Orphanage_login.html';
                }, 1500);
                 });

    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    $.bootstrapGrowl("Email Already registred"+errorCode, {
      type: 'danger',
      align: 'left',
      stackup_spacing: 30
  });

  });
    

}




// Already Existing Account

function login_orphan(){

    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    $.bootstrapGrowl("Login Sucessfull",{type:'success'});
    setTimeout(function(){
      window.location.assign("FoodRequest.html");

    },1500)

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    $.bootstrapGrowl(errorCode, { type: 'danger' });
  });

}
// -------new Page Open---------------
function home_open()
{
}
