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
 
//--------------Donar food data-----------


firebase.database().ref('OrphanageFoodRequest').on('value',function(snapshot){
    let users=snapshot.val();
    let count=1;
  document.getElementById('Orphanagefooddata').innerHTML='';
  for(const user in users)
  {
    document.getElementById('Orphanagefooddata').innerHTML+=`
    <tr>
    <td>${count}</td>
    <td>${users[user].timeStamp}</td>
    <td>${users[user].UserId}</td>
    <td>${users[user].Email}</td>
    <td>${users[user].PhoneNumber}</td>
    <td>${users[user].Name}</td>
    <td>${users[user].Quantity}</td>
    <td>${users[user].Address}</td>
    <td class="text-center" > <a href="#" class="btn text-danger" onclick="func()" > <i class="fas fa-trash-alt"></i> </a> </td>  
    `;
    count++;
  }
  })
  
  
  function func(){
    // alert("You clicked it");
    var id = prompt("Enter User Id", "UserID");
    if (id != null) {
      // var id=document.getElementById('oid').value;
      firebase.database().ref('OrphanageFoodRequest/'+id).remove()
      .then((info)=>{
        $.bootstrapGrowl("Successfully deleted", { type: 'success' });
      })
  }
  }

  function download_orphanagefood_data(){
    
    const d=new Date();
    var dd=d.getDate();
    var m=d.getMonth();
    var yy=d.getFullYear();
 
    if(dd<10) dd='0'+dd;
    if(m<10) m='0'+m;
    const filename1="Orphanage_FoodData"+"_"+dd+"/"+m+"/"+yy;
 kendo.drawing.drawDOM($("#table"))
     .then(function(group){
         return kendo.drawing.exportPDF(group,{
             paperSize:"auto",
             margin:{
                 left:"1cm",
                 right:"1cm",
                 top:"1cm",
                 bottom:"1cm"
             }
         });
     })
     .done(function(data){
         kendo.saveAs({
             dataURI:data,
             fileName:filename1
         })
     });
  }
  function sortTable(n) {
    var table;
    table = document.getElementById("table");
    var rows, i, x, y, count = 0;
    var switching = true;

    // Order is set as ascending
    var direction = "ascending";

    // Run loop until no switching is needed
    while (switching) {
        switching = false;
        var rows = table.rows;

        //Loop to go through all rows
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;

            // Fetch 2 elements that need to be compared
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            // Check the direction of order
            if (direction == "ascending") {

                // Check if 2 rows need to be switched
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())
                    {
                    // If yes, mark Switch as needed and break loop
                    Switch = true;
                    break;
                }
            } else if (direction == "descending") {

                // Check direction
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
                    {
                    // If yes, mark Switch as needed and break loop
                    Switch = true;
                    break;
                }
            }
        }
        if (Switch) {
            // Function to switch rows and mark switch as completed
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;

            // Increase count for each switch
            count++;
        } else {
            // Run while loop again for descending order
            if (count == 0 && direction == "ascending") {
                direction = "descending";
                switching = true;
            }
        }
    }
}


  function logout(){
    $.bootstrapGrowl("Logout successfully", { type: 'success' }); 
setTimeout(function(){
  window.location.replace("Volunteer_login.html");

},1500)    
  }
