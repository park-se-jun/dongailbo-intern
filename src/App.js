import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BaseMap from "./component/BaseMap";
import Header from "./component/Header";
import Section from "./component/Section";

export default function App({ $target, textList }) {
  this.state = {};
  this.setState = (nextState) => {};
  const baseMap = new BaseMap();
  const sections = [];
  const header = new Header($target, "intro");
  for (let i = 0; i < 4; i++) {
    new Section($target, `Map 제${i}번째`, textList[i]);
  }
  for (let i = 4; i < 6; i++) {
    new Section($target, `Graph 제${i}번째`, textList[i]);
  }
  console.log("App실행");


  /** 애니메이션 처리 부 */
  gsap.registerPlugin(ScrollTrigger);

  gsap.set("#base-map", {
    autoAlpha: 0,
  });
  gsap.set(".intro-image", {
    autoAlpha: 1,
  });
  gsap.set(".textbox", { autoAlpha: 0 });

  gsap.to("#base-map", {
    autoAlpha: 1,
    scrollTrigger: {
      trigger: ".Map.제0번째",
      start: "top center",
      toggleActions: "play none none reverse",
      markers: true,
      // onEnter:changePlaceTo("우한")
    },
  });
  gsap.to(".intro-image", {
    autoAlpha: 0,
    scrollTrigger: {
      trigger: ".Map.제0번째",
      start: "top center",
      toggleActions: "play none none reverse",
      markers: true,
    },
  });
}
