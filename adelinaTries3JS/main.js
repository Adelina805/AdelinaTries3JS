import './style.css'
import * as THREE from 'three'; // use three.js library

// SETUP

const scene = new THREE.Scene(); // create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // create camera (FOV, aspect ration, view frustrum)
const renderer = new THREE.WebGLRenderer({ // create renderer
  canvas: document.querySelector('#bg'), // use canvas
});

renderer.setPixelRatio(window.devicePixelRatio); // pixel ratio = window pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight); // renderer size = window size, fullscreen
camera.position.setZ(30); // move camera back on z axis

renderer.render(scene, camera); // render scene and camera

// TORUS

const geometry = new THREE.TorusGeometry(10, 3, 16, 100); // create shape
const material = new THREE.MeshStandardMaterial({ color: 0xff6347}); // create material
const torus = new THREE.Mesh(geometry, material); // combine shape and material

scene.add(torus); // add shape to scene

// LIGHTS

const pointLight = new THREE.PointLight(0xffffff); // create light
pointLight.position.set(5, 5, 5) // set position
scene.add(pointLight); // add to scene




// RENDER + ANIMATION LOOP

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}
animate(); // call animate function