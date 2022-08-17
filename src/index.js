import App from "./App";
import "./style.css"
import "./component/BaseMap"
import "./component/BaseMap"
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { changePlaceTo, initMap } from "./component/BaseMap";
gsap.registerPlugin(ScrollTrigger);
const title = "코로나19 국내 발생 2년, 끝나지 않는 굴레"
const textList = [
    `2020년 1월 18일

    중국 후베이성 우한에 사는 A 씨(35)는 출국을 하루 앞두고 발열 오한 등 감기 증상이 나타났다. 시내 병원에서 진료를 받고 감기약을 처방받았다.`,
    `1월 19일 오전

    A 씨는 우한 공항에서 한국 인천으로 가는 비행기를 탔다. 가족 2명, 친구 가족 3명 등 5명이 동행했다. 일본 여행을 가기 위해 인천에서 환승하는 일정이었다.`,
    `1월 19일 오후 12시 25분

    비행기에서 내린 A 씨가 인천공항 탑승동 게이트로 향했다. 체온을 쟀는데 38.0도가 나왔다. 여기에 발열, 오한, 근육통, 콧물 증상이 있었다. 검역당국의 판단에 따라 A 씨는 임시격리실로 이동했다.`,
    `1월 19일 오후 3시경

    A 씨는 검역관과 임시격리실을 나와 공항 1층으로 나갔다. 건물 앞에 대기 중이던 구급차로 인천의료원에 이송됐다. 1월 20일 오전 8시, A 씨는 코로나19 확진 판정을 받았다. A 씨는 국내에서 확인된 첫 코로나19 환자였다. `,
    `첫 코로나19 확진자 발생 후 2년이 흘렀다. 코로나19는 여전히 종식되지 않았다. 코로나 접종 완료율이 85%에 이르고 치료제까지 나왔지만 코로나는 끝날 기미가 없다. 오히려 델타보다 전파력이 3배 강한 오미크론 변이가 출현해 세계적으로 5차 대유행을 일으키고 있다. `,
    `국내도 오미크론 영향권에 들면서 한동안 진정세를 보이던 확진자가 증가세로 돌아섰다. 2월 4일 0시 기준 일일 신규 확진자는 2만7443명이다. 이날까지 누적 확진자는 93만4656명이다. `

]
new App({$target:document.querySelector('.App'),textList,title})
// const $app = document.querySelector("#root");

// initMap();
// const render =  