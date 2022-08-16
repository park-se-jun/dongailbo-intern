import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BaseMap from "./component/BaseMap";
import Header from "./component/Header";
import Section from "./component/Section";

export default function App({ $target, textList }) {
  this.state = {};
  this.setState = (nextState) => {};
  const baseMap = new BaseMap();
  this.sections = [];
  const header = new Header($target, "intro");
  for (let i = 0; i < 4; i++) {
    this.sections.push(new Section($target, `Map 제${i}번째`, textList[i]));
  }
  for (let i = 4; i < 6; i++) {
    this.sections.push(new Section($target, `Graph 제${i}번째`, textList[i]));
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
  console.log(this.sections);
  this.sections.forEach((element,i)=>{
    if(i>4) return;
    ScrollTrigger.create({
        trigger:element.$element,
        start:"top center",
        onEnter:baseMap.setMarker(i),
        onEnterBack:baseMap.setMarker(i),
        onLeave:baseMap.removeMarker(i),
        onLeaveBack:baseMap.removeMarker(i),

    })
  })

}
