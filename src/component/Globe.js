import * as THREE from "three";
import landData from "../../public/land.json";
import perMillionData from "../../public/perMillion.json";

import Map3DGeometry from "../lib/map3d";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
const ContriesSet = new Set([
  "대한민국",
  "미국",
  "브라질",
  "캐나다",
  "독일",
  "인도",
  "이스라엘",
  "일본",
  "러시아",
  "남아프리카 공화국",
  "영국",
]);
export default function Globe() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const light = new THREE.DirectionalLight(0xefefefe, 1);
  camera.position.set(0, 0, 800);
  camera.lookAt(scene.position);
  camera.add(light);
  scene.add(camera);
  let renderer, land, targetLand, sea, radius, controls;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  land = new THREE.MeshToonMaterial({ color: 0x66ff52 });
  targetLand = new THREE.MeshToonMaterial({ color: 0x06411b });
  sea = new THREE.MeshToonMaterial({ color: 0x049ef4 });
  radius = 0.995;
  renderer.setClearColor(0x000000);

  const container = document.getElementById("globe");
  container.appendChild(renderer.domElement);
  this.$element = renderer.domElement;
  controls = new OrbitControls(camera, this.$element);
  controls.enableZoom = false;
  function Balloon(html) {
    THREE.Object3D.call(this);
    this.popup = document.createElement("div");
    this.popup.classList.add("balloon");
    this.popup.innerHTML = html;
    this.addEventListener(
      "added",
      function () {
        container.appendChild(this.popup);
      }.bind(this)
    );

    this.addEventListener(
      "removed",
      function () {
        container.removeChild(this.popup);
      }.bind(this)
    );
  }
  Balloon.prototype = Object.create(THREE.Object3D.prototype);
  Balloon.prototype.constructor = Balloon;

  Balloon.prototype.updateMatrixWorld = (function () {
    var screenVector = new THREE.Vector3();
    var raycaster = new THREE.Raycaster();

    return function (force) {
      THREE.Object3D.prototype.updateMatrixWorld.call(this, force);

      screenVector.set(0, 0, 0);
      this.localToWorld(screenVector);

      raycaster.ray.direction.copy(screenVector);

      raycaster.ray.origin.set(0, 0, 0);
      camera.localToWorld(raycaster.ray.origin);
      raycaster.ray.direction.sub(raycaster.ray.origin);

      var distance = raycaster.ray.direction.length();
      raycaster.ray.direction.normalize();

      var intersections = raycaster.intersectObject(scene, true);
      if (intersections.length && intersections[0].distance < distance) {
        // overlay anchor is obscured
        this.popup.style.display = "none";
      } else {
        // overlay anchor is visible
        screenVector.project(camera);

        this.popup.style.display = "";
        this.popup.style.left =
          Math.round(((screenVector.x + 1) * container.offsetWidth) / 2 - 50) +
          "px";
        this.popup.style.top =
          Math.round(
            ((1 - screenVector.y) * container.offsetHeight) / 2 - 100
          ) + "px";
      }
    };
  })();

  const globe = new THREE.Object3D();
  globe.scale.set(250, 250, 250);
  scene.add(globe);
  let label = new Balloon(
    '<div class="text" style="padding: 10px 0 10px 0;">' +
      '<div style="text-align: center; width: 100%;">나라를 눌러 정보를 확인하기</div>' +
      "</div>" +
      '<div class="arrow"></div>'
  );
  label.position.set(1e-3, 1, 1e-3);
  globe.add(label);

  let geometry = new THREE.SphereGeometry(radius, 30, 15);
  globe.add(new THREE.Mesh(geometry, sea));
  for (const name in landData) {
    geometry = new Map3DGeometry(landData[name], 0);
    if (ContriesSet.has(name)) {
      globe.add((landData[name].mesh = new THREE.Mesh(geometry, targetLand)));
      landData[name].mesh.name = name;
    } else {
      globe.add((landData[name].mesh = new THREE.Mesh(geometry, land)));
    }
  }

  const resize = () => {
    const w = renderer.domElement.parentElement.clientWidth;
    const h = renderer.domElement.parentElement.clientHeight;
    // notify the renderer of the size change
    renderer.setSize(w, h);
    // update the camera
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", resize, false);
  resize();
  /** */

  var stop = false;
  var frameCount = 0;
  var fps, fpsInterval, startTime, now, then, elapsed;

  startAnimating(5);

  function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    animate();
  }

  function animate(newtime) {
    if (stop) {
      return;
    }
    requestAnimationFrame(animate);
    now = newtime;
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      then = now - (elapsed % fpsInterval);
      controls.update();
      renderer.render(scene, camera);
    }
  }

  /** */
  renderer.domElement.addEventListener("click", function (event) {
    var raycaster = new THREE.Raycaster();

    raycaster.ray.origin.set(0, 0, 0);
    camera.localToWorld(raycaster.ray.origin);
    raycaster.ray.direction
      .set(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - 2 * (event.clientY / window.innerHeight),
        0.5
      )
      .unproject(camera)
      .sub(raycaster.ray.origin)
      .normalize();

    var intersects = raycaster.intersectObject(scene, true);
    if (intersects && intersects[0]) {
      var mesh = intersects[0].object;
      if (mesh.name) {
        let point = intersects[0].point;
        mesh.worldToLocal(point);
        let perMillion = perMillionData[mesh.name].numberOfPeople;
        let date = perMillionData[mesh.name].date;
        document.querySelector("#globe .balloon .text").innerHTML =
          mesh.name +
          "<br /><br />100만명 당 확진자:<br/> " +
          perMillion +
          '명<br /><div style="font-size:x-small; color:#e5e5e5"><br/>' +
          date +
          "일 기준</div>";

        label.position.copy(point).normalize().multiplyScalar(1.005);
        mesh.add(label);
      }
    }
  });
}
