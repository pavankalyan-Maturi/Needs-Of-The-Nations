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
        var Mobile_Number=snapshot.val().Mobile_Number;
        var Email=snapshot.val().Email;
        var UserID=snapshot.val().UserID;
        $.bootstrapGrowl("Login as:"+name, { type: 'success' });

        document.getElementById('user_title').innerHTML=name; 
        document.getElementById('name').innerHTML=name; 
        document.getElementById('phone').innerHTML=Mobile_Number; 
        document.getElementById('email').innerHTML=Email; 
        document.getElementById('address').innerHTML=UserID; 
        
        


    })
}

function logout(){
  $.bootstrapGrowl("Logout successfully", { type: 'success' }); 
setTimeout(function(){
window.location.replace("Volunteer_login.html");

},1500)    
}