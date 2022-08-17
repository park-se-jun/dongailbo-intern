import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import places from "./../../public/latlng.json";
const { Loader } = require("@googlemaps/js-api-loader");

export default function BaseMap() {
  this.$element = document.querySelector("#base-map");
  this.loader = new Loader({
    apiKey: process.env.GOOGLE_MAP_API,
    version: "weekly",
    libraries: ["places"],
  });
  this.zoom = 4;
  this.places = places;
  this.myGoogle;
  this.myMap;
  this.markers = [];
  this.sections = [];
  this.mapOption = {
    center: { lat: this.places[0].lat, lng: this.places[0].lng },
    zoom: this.zoom,
    disableDefaultUI: true,
  };
  this.mapGsapInit = () => {
    console.log("map 애니메이션");
    gsap.registerPlugin(ScrollTrigger);
    this.sections = gsap.utils.toArray(".section");
    console.log(this.sections);
    gsap.set(this.$element, {
      autoAlpha: 0,
    });
    this.sections.forEach(($element, i) => {
      console.log(`${i}번째 맵`);
      if (i < 4) {
        ScrollTrigger.create({
          trigger: $element,
          start: "top center",
          end: `bottom center`,
          onEnter: () => {
            if (i == 0) {
              gsap.to(this.$element, { autoAlpha: 1 });
            }
            this.moveMarker(i);
            this.setMarker(i);
          },
          onEnterBack: () => {
            this.moveMarker(i);
            this.setMarker(i);
          },
          onLeave: () => {
            this.removeMarker(i);
          },
          onLeaveBack: () => {
            if (i == 0) {
              gsap.to(this.$element, { autoAlpha: 0 });
            }
            this.removeMarker(i);
          },
        });
      } else if(i==4){
        ScrollTrigger.create({
          trigger: $element,
          start: "top center",
          end: `bottom center`,
          onEnter: () => {
            gsap.to(this.$element, { autoAlpha: 0 });
          },
          onLeaveBack: () => {
            gsap.to(this.$element, { autoAlpha: 1 });
          },
        });
      }
    });
  };

  this.render = () => {
    console.log("맵 랜더링");
    this.loader
      .load()
      .then((google) => {
        this.myMap = new google.maps.Map(this.$element, this.mapOption);
        console.log(this.myMap);
        this.myGoogle = google;

        console.log(this.myGoogle);
        this.makeMarker();
        console.log("마커 생성중");
        console.log(this.markers);
        // this.mapGsapInit();

        // makeMarkers();
        // currentMarker=markersMap.get("우한")
        // // changePlaceTo("우한");
      })
      .catch((e) => {});
  };
  console.log(this.places);

  this.makeMarker = () => {
    for (const element of this.places) {
      this.markers.push(
        new this.myGoogle.maps.Marker({
          position: { lat: element.lat, lng: element.lng },
          animation: this.myGoogle.maps.Animation.Drop,
        })
      );
    }
  };
  this.moveMarker = (index) => {
    this.myMap.panTo({
      lat: this.places[index].lat,
      lng: this.places[index].lng,
    });
  };
  this.setMarker = (index) => {
    console.log("setMarker 진입");
    this.markers[index].setMap(this.myMap);
  };
  this.removeMarker = (index) => {
    this.markers[index].setMap(null);
  };
  this.render();
}
