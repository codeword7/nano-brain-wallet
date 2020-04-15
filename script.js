// wheres axios request ?


// implement this 
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
          sendnano(nanoAddress, nanoAmount);
        } else{
          alert('Login or signup to use the service')
        }
      });
      $("#loginBtn").click(function(){
        var user = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var pinNumber = document.getElementById("pinnumber").value;
  
        // well done 10/10
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
        hash = sha256(user + password + pinNumber ) 
        console.log(hash)
  
        localStorage.setItem("hash", hash);
        
        $("#username").prop('disabled', true);
        $("#password").prop('disabled', true);
        $("#pinnumber").prop('disabled', true);
        $("#loginBtn").css("display", "none");
        $("#logoutBtn").css("display","block");
  
        location.reload();      
      
      });
      $("#logoutBtn").click(function(){
        localStorage.removeItem("hash");
        $("input").prop('disabled', false);
        $("#loginBtn").css("display", "block");
        $("#logoutBtn").css("display","none");
        location.reload();
      });
    });
    var hash = localStorage.getItem("hash");
  
    if(hash === null){
          $("#loginBtn").css("display", "block");
          $("#logoutBtn").css("display","none");
    }else{
        //$("input").prop('disabled', true);
        $("#username").prop('disabled', true);
        $("#password").prop('disabled', true);
        $("#pinnumber").prop('disabled', true);
          $("#loginBtn").css("display", "none");
          $("#logoutBtn").css("display","block");
    }
  
    
     settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://nanopay.besoeasy.com/balance",
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