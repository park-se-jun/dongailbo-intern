import TextBox from "./TextBox";

export default function Section($target,$className,$text){
    this.$element = document.createElement("section");
    this.$element.className = $className;
    $target.appendChild(this.$element);

    this.render = () =>{
        console.log($className + "생성")
        this.TextBox = new TextBox(this.$element,`textbox ${this.$element.classList[1]}`,$text)
    }
    this.render();
}