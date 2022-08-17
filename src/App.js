import gsap from "gsap";
import Draggable from "gsap/Draggable";
import ScrollTrigger from "gsap/ScrollTrigger";
import BaseMap from "./component/BaseMap";
import Chart from "./component/chart";
import Globe from "./component/Globe";
import Header from "./component/Header";
import Section from "./component/Section";
// import article from "../public/article.json"
import TextBox from "./component/TextBox";
export default function App({ $target,textList,title}) {
  this.state = {};
  this.setState = (nextState) => {};
  this.sectionList = [];
  const header = new Header($target, "intro",title);
  for(let i = 0; i<6;i++){
    this.sectionList.push(new Section($target,`section section${i+1}`,textList[i]));
  }
  const baseMap = new BaseMap();
  const globe = new Globe();
  const chart = new Chart();
  console.log("App실행");


  /** 애니메이션 처리 부 */
  baseMap.mapGsapInit();
  gsap.set(".text-box",{y:"20vh"})
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(".intro-image", {
    autoAlpha: 1,
  });
  gsap.set("#globe, #chart,#base-map",{autoAlpha:0})
  gsap.to(".intro-image", {
    autoAlpha: 0,
    scrollTrigger: {
      trigger: ".section1",
      start: "top center",
      toggleActions: "play none none reverse",
    //   markers: true,
    },
  });
  gsap.to("#globe",{
    autoAlpha: 1,
    scrollTrigger:{
      trigger:".section5",
      start:"top center",
      end:"bottom center",
      toggleActions: "play reverse play reverse",
    }
  })
  gsap.to("#chart",{
    autoAlpha: 1,
    scrollTrigger:{
      trigger:".section6",
      start:"top center",
      end:"bottom center",
      toggleActions: "play reverse play reverse",
      markers:true
    }
  })
  console.log(this.sections);

}
