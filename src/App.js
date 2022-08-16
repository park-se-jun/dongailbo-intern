import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BaseMap from "./component/BaseMap";
import Globe from "./component/Globe";
import Header from "./component/Header";
import Section from "./component/Section";

export default function App({ $target, textList }) {
  this.state = {};
  this.setState = (nextState) => {};
  this.sections = [];
  const header = new Header($target, "intro","코로나19 국내 발생 2년, 끝나지 않는 굴레");
  for (let i = 0; i < 4; i++) {
    this.sections.push(new Section($target, `Map 제${i}번째`, textList[i]));
  }
  for (let i = 4; i < 6; i++) {
    this.sections.push(new Section($target, `Graph 제${i}번째`, textList[i]));
  }
  const baseMap = new BaseMap();
  const globe = new Globe();
  console.log("App실행");


  /** 애니메이션 처리 부 */
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(".intro-image", {
    autoAlpha: 1,
  });

  gsap.to(".intro-image", {
    autoAlpha: 0,
    scrollTrigger: {
      trigger: ".Map.제0번째",
      start: "top center",
      toggleActions: "play none none reverse",
    //   markers: true,
    },
  });
//   console.log(this.sections);

}
