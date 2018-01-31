const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoiamFuZWxncjUiLCJhIjoiY2pkMXVoY3hhMnBxajJxcXNjdnl0amhkNyJ9.dUmC4J2E_KrHhJWmf53iDw";

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

// const marker = buildMarker("activities", fullstackCoords);
// marker.addTo(map);

//fetch the list of hotels, restaurants and attractions from the server using Ajax
//fetch returns a response that's an object
//call the fetch funciton passing the url of the api as a parameter
fetch('/api')
//handles data as a JSON object - transforms the data into json
.then(response => response.json())
.then(data => {
  //code for handling the data you get from the api
  console.log(data)
  data.restaurants.forEach(restaurant =>{
    //get the select where we will place our options
    const select = document.getElementById('restaurants-choices')

    //creates the options tag in the index.html file
    const newOption = document.createElement('option');

    //set the option's value
    //where can i find this method to look up documentation?
    newOption.nodeValue = restaurant.id;

    //set the option's text to that option's name
    newOption.innerText = restaurant.name;

    //appends the option to the select
    select.append(newOption);
    
  })
  data.hotels.forEach(hotel =>{
    select = document.getElementById('hotels-choices')
    newOption = document.createElement('option');
    newOption.nodeValue = hotel.id;
    newOption.innerText = hotel.name;
    select.appendChild(newOption);
  })
  data.activities.forEach(activity =>{
    select = document.getElementById('activities-choices')
    newOption = document.createElement('option');
    newOption.nodeValue = activity.id;
    newOption.innerText = activity.name;
    select.appendChild(newOption);
  })
})
.catch(error =>{
  console.log(error);
})

