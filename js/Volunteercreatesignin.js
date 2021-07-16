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

function submit_data()
{
    var name=document.getElementById('username').value;
    var email=document.getElementById('mailid').value;
    var number1=document.getElementById('number1').value;
    var number2=document.getElementById('number2').value;
    var password=document.getElementById('password1').value;
    var password2=document.getElementById('password2').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response) => {
      // Signed in 
        // console.log("Successfully created");
        var id=firebase.auth().currentUser.uid;
        firebase.database().ref('Volunteersdata/'+id).set({
                UserID:id, 
                Name:name,
                Email:email,
                Mobile_Number:number1,
                Confirm_Number:number2,
                Password:password,
                Confirm_Password:password2
        })
            .then((info)=>{
                    firebase.auth().currentUser.sendEmailVerification()
                        .then(() => {
                          $.bootstrapGrowl("Sent Email Verification", { type: 'primary' });
                           setTimeout(function(){
                            window.location.replace("Volunteer_login.html");
                           },1500)
                         
                                 });

            })    
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

// email verifcation
function login_volunteer(){
  var email=document.getElementById('email').value;
  var password=document.getElementById('password').value;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    $.bootstrapGrowl("Sucessful Login.", { type: 'success' });
setTimeout(function(){
window.location.href='Volunteer_Homes.html'
},1500)

    // window.location.assign("");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // alert(errorMessage)
    $.bootstrapGrowl("Invalid username or password", {
      type: 'danger',
      align: 'left',
      width: 'auto',
      allow_dismiss: false
  });
  });
  


}


