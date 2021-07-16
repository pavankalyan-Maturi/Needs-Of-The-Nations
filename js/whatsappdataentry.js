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
  
  firebase.auth().onAuthStateChanged((info) => {
    if (info) {
  
      var search_id=info.uid;
     sample(search_id);

    //  profile_data(search_id);
    }
})
function sample(id) {
    
    firebase.database().ref('Volunteersdata/'+id).on('value',function(snapshot){
        var name=snapshot.val().Name;
        document.getElementById('user_title').innerHTML=name;  
    })
}
 
function submit_data()
{
    var UserName=document.getElementById('usr').value;
    var Mobile_Number=document.getElementById('PhoneNumber').value;
    var mailid=document.getElementById('mail').value;
    var rd1=document.getElementById('rd1');
    var rd2=document.getElementById('rd2');
    var rd3=document.getElementById('rd3');
    var rd4=document.getElementById('rd4');
    var rd5=document.getElementById('rd5');
    var Address=document.getElementById('Address').value;
    var Quantity=document.getElementById('Quantity').value;
    if(rd1.checked==true)
    {
        value1=rd1.value;
    }   
    if(rd2.checked==true)
    {
        value1=rd2.value;
     }   
    if(rd3.checked==true)
    {
        value1=rd3.value;
    }   
    if(rd4.checked==true)
    {
        value1=rd4.value; 
    }   
    if(rd5.checked==true)
    {
        value1=rd5.value;
    } 
    


 firebase.database().ref('whatsappFoodDonarInfo/'+Mobile_Number).set({
 Mobile_Number:Mobile_Number,
UserName:UserName,
mailid:mailid,
DonarType:value1,
Quantity:Quantity,
Address:Address
 }).then(()=>
 {
    $.bootstrapGrowl("Successfully uploaded", {type: 'success'});
    setTimeout(function(){
        window.location.reload();
    },1500)
  
 })
 .catch((error)=>{
     var errorCode=error.code;
    $.bootstrapGrowl(errorCode, {
        type: 'danger',
        align: 'left',
        width: 'auto',
        allow_dismiss: false
    });
   
 })
}


function logout(){
    $.bootstrapGrowl("Logout successfully", { type: 'success' }); 
setTimeout(function(){
  window.location.replace("Volunteer_login.html");

},1500)    
  }