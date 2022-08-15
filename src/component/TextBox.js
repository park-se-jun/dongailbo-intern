import gsap from "gsap";

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
  this.render();
}
