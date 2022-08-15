const { Loader } = require("@googlemaps/js-api-loader");
const latlngMap = new Map();
let markersMap = new Map();
let currentMarker;
let myMap;
// let myGoogle;
latlngMap.set("우한", {
  lat: 30.55,
  lng: 114.28,
});
latlngMap.set("인천국제공항", {
  lat: 37.45,
  lng: 126.44,
});

const loader = new Loader({
  apiKey: process.env.GOOGLE_MAP_API,
  version: "weekly",
  libraries: ["places"],
});
const mapOption = {
  center: latlngMap.get("우한"),
  zoom: 8,
  disableDefaultUI: true,
};

export function initMap() {
  loader
    .load()
    .then((google) => {
      myGoogle = google;
      myMap = new myGoogle.maps.Map(
        document.querySelector("#base-map"),
        mapOption
      );
      makeMarkers();
      currentMarker=markersMap.get("우한")
      // changePlaceTo("우한");
    })
    .catch((e) => {});
}
function makeMarkers() {
  latlngMap.forEach((value, key) => {
    const marker = new myGoogle.maps.Marker({
      position: value,
      animation: myGoogle.maps.Animation.Drop,
    });
    markersMap.set(key, marker);
  });
}
export function changePlaceTo(key) {
  console.log(currentMarker)
  currentMarker.setMap(null);
  currentMarker = markersMap.get(key);
  currentMarker.setMap(myMap);
  myMap.panTo(latlngMap(key))
}
// initMap();
// const marker = new google.maps.Marker({
//   position: latlngMap.get("우한"),
// });


export default function BaseMap(){
  this.$element = document.querySelector("#base-map");
  this.lader = new Loader({
    apiKey: process.env.GOOGLE_MAP_API,
    version: "weekly",
    libraries: ["places"],
  });
  this.zoom = 8;
  this.latlngList = new Map();
  this.markerList = new Map();
  this.myGoogle;
  this.setLatlngList = () =>{
    this.latlngList
  }
  this.render =()=>{
    console.log("맵 랜더링")
    loader
    .load()
    .then((google) => {
      myMap = new google.maps.Map(
        this.$element,
        mapOption
      );
      this.myGoogle = google;
      // makeMarkers();
      // currentMarker=markersMap.get("우한")
      // // changePlaceTo("우한");
    })
    .catch((e) => {});
  }
  this.render();
}