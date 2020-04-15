// function to send nano at address as user defined 
function sendnano(address, amount){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://nanopay.besoeasy.com/send/" +address+"/" + amount,
    "method": "POST",
    "headers": {
      "seed":  localStorage.getItem("hash"),
      "index": 0
    }
  } 
  $.ajax(settings).done(function (response) {
    console.log(response);
     location.reload();
  });
  }
  $(document).ready(function(){
    //validating when SEND button is clicked
      $("#nanoSend").click(function(){
        if(localStorage.getItem("hash") !== null){
        var nanoAddress = document.getElementById("nanoAddr").value;
        var nanoAmount = document.getElementById("nanoAmount").value;
          if(nanoAddress.length === 0){
            alert('Address cannot be empty')
            return;
          }
          if(nanoAmount.length === 0){
            alert('please enter the amount to send')
            return;
          }
          nanoAddress.trim();
          nanoAmount.trim();
          sendnano(nanoAddress, nanoAmount); //calling send nano function
        } else{
          alert('Login or signup to use the service')
        }
      });
    //validating when LOGIN button is clicked
      $("#loginBtn").click(function(){
        var user = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var pinNumber = document.getElementById("pinnumber").value;
          if(user.length !== 4 && user.length < 4){
              alert('Username should be equal or greater than 4')
              return;
          }
          if(password.length !== 4 && password.length < 4){
              alert('Password should be equal or greater than 4')
              return;
          }
          if(pinNumber.length !== 4){
              alert('Set PIN 4 digit')
              return;
          }

        console.log(user, password, pinNumber)
        hash = CryptoJS.SHA256(String(user + password + pinNumber)) 

        localStorage.setItem("hash", hash); //storing the hash is your browser
        $("#username").prop('disabled', true);
        $("#password").prop('disabled', true);
        $("#pinnumber").prop('disabled', true);
        $("#loginBtn").css("display", "none");
        $("#logoutBtn").css("display","block");
        location.reload();      
      });
    //when LOGOUT button is clicked
      $("#logoutBtn").click(function(){
        localStorage.removeItem("hash"); //remove the data store in browser
        $("input").prop('disabled', false);
        $("#loginBtn").css("display", "block");
        $("#logoutBtn").css("display","none");
        location.reload();
      });
    });
    var hash = localStorage.getItem("hash"); //getting the stored data from browser 
    if(hash === null){
          $("#loginBtn").css("display", "block");
          $("#logoutBtn").css("display","none");
    }else{
        $("#username").prop('disabled', true);
        $("#password").prop('disabled', true);
        $("#pinnumber").prop('disabled', true);
          $("#loginBtn").css("display", "none");
          $("#logoutBtn").css("display","block");
    }
//settings for AJAX requests
     settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://nanopay.besoeasy.com/balance", //using NANO PAYMENT API
      "method": "POST",
      "headers": {
        "seed": hash,
        "index": 0
      }
    }
    $.ajax(settings).done(function (response) {
    $('#v1').text(response.address)
    $('#v2').text(response.balance + " NANO")
    $('#hashID').text(hash)
    $("img").attr("src", "https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=" + hash);
    nano_work_cache(response.address)
    $.getJSON('https://onefastway.com/nanoinfo/' + response.address).done(function(datax) { 
    if( datax.pendingblocks.length > 0 ){
    var settings2 = {
      "async": true,
      "crossDomain": true,
      "url": "https://nanopay.besoeasy.com/fetch",
      "method": "POST",
      "headers": {
        "seed": hash,
        "index": 0
      }
    }
    $.ajax(settings2).done(function (response2) {
      console.log(response2);
    });
    }
        datax.history.forEach(function(xxx) {
              table = document.getElementById("myTable");
              row = table.insertRow(-1);
              row.insertCell(0).innerHTML = `${xxx.height}`
              row.insertCell(1).innerHTML = `${xxx.type}`
              row.insertCell(2).innerHTML = `${xxx.account}`
              row.insertCell(3).innerHTML = (xxx.amount / 1000000000000000000000000000000).toFixed(8);
        })	
    
    });
    
    });
