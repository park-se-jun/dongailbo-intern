import gsap from "gsap";
import Draggable from "gsap/Draggable";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function TextBox($target, $className, $text) {
  this.$element = document.createElement("div");
  this.$element.className = $className;
  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
        <p>
            ${$text}
        </p>
        `;
  };
  // gsap.set(this.$element,{autoAlpha:0})
  gsap.set(this.$element,{autoAlpha:0,x:400,y:200});
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(this.$element,{
    autoAlpha:1,
    scrollTrigger:{
      trigger:this.$element,
      start:"center center",
      end:`center 100vh`,
      toggleActions:"play reverse play reverse",
      pin:true,
      // markers:true
    }
  })
  
  this.render();
}
