function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.getElementById("name").innerText = profile.getName();
    document.getElementById("main").style.visibility = "visible";
}
let map;
const api_url = "https://api.foursquare.com/v2/venues/search";
let markers = [];
function initMap() {
            const tokyo = {lat: 35.693489, lng: 139.675538};
            map = new google.maps.Map(document.getElementById('map'), {
              zoom: 13,
              center: tokyo
            });
          }
function instable(event){
  if(event.keyCode == 13){
      var minLat;
      var minLong;
      var maxRadius;
      var client_id = "WYEFOAHKJ1IJXRM1JARRHRA1VMCTIU5L4OCN3QWGCJTXOHJH"; 
      var client_secret = "TLGXT0E0CN31D5QSLIHLPVNMUZBUG4Q2ZKT5JOD3HFIFUWHA"; 
      var version = "20130815";
      var limit = "5";
      var tokyo = {lat: 35.693489, lng: 139.675538};
      var FourSquareAPI = api_url + '?client_id=' + client_id + '&client_secret=' + client_secret + '&v=' + version + '&ll=' + tokyo.lat + ',' + tokyo.lng + '&query=' + event.target.value + '&limit=' + limit;
      axios.get(FourSquareAPI).then(function(response){
        getData(response.data);
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date();
        let tr = document.createElement('tr');
        let info = [event.target.value,minLat,minLong,Math.round(maxRadius / 1000) + "km",monthNames[d.getMonth()] + " " + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()];
        for(let i = 0;i<5;i++){
         let td = document.createElement('td');
         td.innerText = info[i];
         tr.appendChild(td);
         document.getElementsByTagName('tbody')[0].appendChild(tr);
        }
        let j = 0;
        if(document.getElementById('tbody2').childNodes.length!==0){
          while(j<5){
            document.getElementById('tbody2').removeChild(document.getElementsByClassName('t2')[0]);
            markers[j].setMap(null);
            j++;
          }
          markers = [];
        }
        for(let i = 0;i<5;i++){
          let tr1 = document.createElement('tr');
          tr1.className = 't2';
          tr1.style.textAlign = "center";
          let name = document.createElement('td');
          let city = document.createElement('td');
          let streetAddress = document.createElement('td');
          let lat = document.createElement('td');
          let lng = document.createElement('td');
          name.innerText = response.data.response.venues[i].name;
          city.innerText = response.data.response.venues[i].location.city;
          streetAddress.innerText = response.data.response.venues[i].location.address;
          lat.innerText = response.data.response.venues[i].location.lat;
          lng.innerText = response.data.response.venues[i].location.lng;
          var marker = new google.maps.Marker({
            position: {lat:+lat.innerText,lng:+lng.innerText},
            map: map
          });
          markers.push(marker);         
          tr1.appendChild(name);
          tr1.appendChild(city);
          tr1.appendChild(streetAddress);
          tr1.appendChild(lat);
          tr1.appendChild(lng);
          document.getElementById('tbody2').appendChild(tr1);
        }
        function getData(data){
          let arrD = [],arrLat = [],arrLog = [];
          for(let i=0;i<5;i++){
            arrLat[i] = data.response.venues[i].location.lat;
            arrLog[i] = data.response.venues[i].location.lng;
            arrD[i] = data.response.venues[i].location.distance;
          }
          maxRadius = Math.max(...arrD);
          minLat = Math.min(...arrLat);
          minLong = Math.min(...arrLog);
        };
      });
}
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      document.getElementById("main").style.visibility = "hidden";
    });
  }    
