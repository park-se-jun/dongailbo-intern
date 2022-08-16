import * as THREE from "three";
import landData from "../../public/land.json"
import Map3DGeometry from "../lib/map3d";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
export default function Globe(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 0, 800);
    camera.lookAt(scene.position);
    scene.add(camera);
    let renderer, land, sea, radius,controls;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    land = new THREE.MeshBasicMaterial({ color: 0x66ff52 });
    sea = new THREE.MeshBasicMaterial({ color: 0x049ef4 });
    radius = 0.995;
    renderer.setClearColor(0xffffff);


    const container = document.getElementById("globe");
    container.appendChild(renderer.domElement);
    this.$element= renderer.domElement;
    controls = new OrbitControls(camera,this.$element);



    const globe = new THREE.Object3D();
    globe.scale.set(250,250,250);
    scene.add(globe);

    let geometry = new THREE.SphereGeometry(radius,30,15);
    globe.add(new THREE.Mesh(geometry,sea));

    for(const name in landData){
        geometry = new Map3DGeometry(landData[name],0)
        globe.add(landData[name].mesh = new THREE.Mesh(geometry, land));
        landData[name].mesh.name = name
    }

    const animate = ()=>{
		requestAnimationFrame (animate);
		controls.update();
		renderer.render (scene, camera);
    }
	const resize =  ()=> {
		const w = renderer.domElement.parentElement.clientWidth;
		const h = renderer.domElement.parentElement.clientHeight;
		// notify the renderer of the size change
		renderer.setSize(w, h);
		// update the camera
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
	};

    window.addEventListener("resize",resize,false);
    resize();
    animate();
}
