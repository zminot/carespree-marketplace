var deviceLat;
var deviceLong;
var url;
//var map = new Microsoft.Maps.Map('#myMap');
// Try HTML5 geolocation.
window.onload = getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported in your browser');
    }
}

function showPosition(position) {
    deviceLat = position.coords.latitude;
    deviceLong = position.coords.longitude;
    url = "https://dev.virtualearth.net/REST/v1/LocalSearch/?query=pharmacy&userCircularMapView=" + deviceLat + "," + deviceLong + ",5000&key=VRi8s7qGDWwKjdIZNxbY~PrQ224TqdqR2EEJ-YDMs_w~ArHscXJnPvbphph6BML7ovB2FqZ85feneUaQkwfXnpEY-2lQ_cVYBcNX_sDo7TML";
}

// function httpGet() {
//   var request = new XMLHttpRequest();
//   xmlHttp.onreadystatechange = function() { 
//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//     {
//       callback(xmlHttp.responseText);
//     }
//   }
//   request.open("GET", url, true);
//   request.send(null);

//   request.onload = function() {
//     var input = request.response;
//     document.write(input);
//   }
// }



queryDrugs = () => {
    $(".products").fadeOut();
    var url_query = '/' + document.getElementById('drug').value + '/' + deviceLat + '/' + deviceLong;
    fetch(url_query)
        .then((resp) => {return resp.text()})
        .then( (data) => {
            $(".products").fadeOut();
            var data = JSON.parse(data);
            console.log(data);
            var products = document.getElementsByClassName("products")[0];
            products.innerHTML = "";

            for(var i = 0; i < data.length; i++) {

                var row = document.createElement("div");
                row.className = "row mt-2";
                var col = document.createElement("div");
                col.className = "col-lg-12 text-center";
                var card = document.createElement("div");
                card.className = "card mx-auto";
                var cardbody = document.createElement("div");
                cardbody.className = "card-body";
                var cardtitle = document.createElement("h5");
                cardtitle.className = "card-title";
                cardtitle.innerHTML = "$" + data[i].Price + " " + data[i].Product_Name;
                var cardsubtitle = document.createElement("h6");
                cardsubtitle.className = "card-subtitle";
                cardsubtitle.innerHTML = data[i].Pharmacy_Name;
                var cardtext = document.createElement("p");
                cardtext.innerHTML = data[i].Address;
                cardtext.className = "card-text";

                cardbody.appendChild(cardtitle);
                cardbody.appendChild(cardsubtitle);
                cardbody.appendChild(cardtext);
                card.appendChild(cardbody);
                col.appendChild(card);
                row.appendChild(col);
                products.appendChild(row);
            }
            $(".products").fadeIn();
        })
        .catch( () => {
        // If there is any error you will catch them here
        }); 
}

queryProviders = () => {
    $(".providers").fadeOut();
    var url_query = '/' + document.getElementById('specialty').value + '/' + document.getElementById('insurance').value + '/' + deviceLat + '/' + deviceLong;
    fetch(url_query)
        .then((resp) => {return resp.text()})
        .then( (data) => {
            $(".providers").fadeOut();
            var data = JSON.parse(data);
            console.log(data);
            var providers = document.getElementsByClassName("providers")[0];
            providers.innerHTML = "";

            for(var i = 0; i < data.length; i++) {

                var row = document.createElement("div");
                row.className = "row mt-2";
                var col = document.createElement("div");
                col.className = "col-lg-12 text-center";
                var card = document.createElement("div");
                card.className = "card mx-auto";
                var cardbody = document.createElement("div");
                cardbody.className = "card-body";
                var cardtitle = document.createElement("h5");
                cardtitle.className = "card-title";
                cardtitle.innerHTML = data[i].Doctor + " - " + data[i].Specialty;
                var cardsubtitle = document.createElement("h6");
                cardsubtitle.className = "card-subtitle";
                cardsubtitle.innerHTML = data[i].Phone + " - " + data[i].Website;
                var cardtext = document.createElement("p");
                cardtext.innerHTML = data[i].Address;
                cardtext.className = "card-text";

                cardbody.appendChild(cardtitle);
                cardbody.appendChild(cardsubtitle);
                cardbody.appendChild(cardtext);
                card.appendChild(cardbody);
                col.appendChild(card);
                row.appendChild(col);
                providers.appendChild(row);
            }
            $(".providers").fadeIn();
        })
        .catch( () => {
        // If there is any error you will catch them here
        }); 
}