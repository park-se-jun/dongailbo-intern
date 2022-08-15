import introImage from "../../images/firstPage.png"
export default function Header($target,$className){
    this.$element =document.createElement('header');
    this.$element.className = $className;
    $target.appendChild(this.$element);
    this.render = () =>{
        console.log("헤더생성")
        const introBg = document.createElement('img');
        introBg.src=introImage;
        introBg.className = "intro-image";
        this.$element.appendChild(introBg);
        this.$element.innerHTML += `
        <div class='chatter'>
          <h1>코로나19 국내 발생 2년, 끝나지 않는 굴레</h1>
          <svg
            style="stroke: #333; stroke-width: 6; fill: none"
            viewBox="0 0 50 50"
            width="50"
            height="25"
          >
            <path d="M 0,0 L 25,25 50,0"></path>
          </svg>
        </div>`
    }
    this.render();
}