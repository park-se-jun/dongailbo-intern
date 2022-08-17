import gsap from "gsap";
import TextBox from "./TextBox";

export default function Section($target,$className,$text){
    this.$element = document.createElement("section");
    this.$element.className = $className;
    this.TextBox;
    $target.appendChild(this.$element);

    this.render = () =>{
        console.log($className + "생성")
        this.TextBox = new TextBox(this.$element,`text-box`,$text)
    }
    this.render();

}