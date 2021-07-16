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

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    
      var uid = user.uid;
sample(uid);
      profile_data(uid);
     //food_request(uid,user.email); 
    } else {
      alert("Error Occured in After login");
    }
  });

  function profile_data(uid)
{
    firebase.database().ref('OrphanageHomesData/'+uid).on('value',function(snapshot){

        var name=snapshot.val().Home_Name;
        var email=snapshot.val().Email;
        var Mobile_Number=snapshot.val().Number;
        document.getElementById('title_user').innerHTML=name
        document.getElementById('name').innerHTML=name;
        document.getElementById('email').innerHTML=email;
        document.getElementById('phonenumber').innerHTML=Mobile_Number;
        // document.getElementById('user_mail').innerHTML=email;
        
        $.bootstrapGrowl("Login as:"+name, { type: 'success' });

    })

}
function sample(uid){
  firebase.database().ref('OrphanageHomesData/'+uid).on('value',function(snapshot){

  
    var email=snapshot.val().Email;
    
    document.getElementById('user_mail1').innerHTML=email;
   
})
}



function submit_data(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          food_request(uid,user.email); 
        }
      });
}
function food_request(uid,mail){

var name=document.getElementById('usr').value;
var Quantity=document.getElementById('Quantity').value;
var PhoneNumber=document.getElementById('PhoneNumber').value;
var Address=document.getElementById('Address').value;
const d=new Date();
    var dd=d.getDate();
    var m=d.getMonth();
    var yy=d.getFullYear();

    if(dd<10) dd='0'+dd;
    if(m<10) m='0'+m;
    const filename1=dd+"-"+m+"-"+yy;
    // alert(filename1)

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var final=filename1+" "+time;

firebase.database().ref('OrphanageFoodRequest/'+uid).set({
    UserId:uid,
    Email:mail,
    Name:name,
    Quantity:Quantity,
    PhoneNumber:PhoneNumber,
    Address:Address,
    timeStamp:final
}).then((info)=>{
  $.bootstrapGrowl("Successfully submitted", { type: 'success' });
  setTimeout(function(){
    window.location.reload();
  },1500)

})
}

function logout(){
  $.bootstrapGrowl("Logout Successfully", { type: 'success' });
  setTimeout(function(){
      window.location.replace("Orphanage_login.html")
  },1500);
   
}