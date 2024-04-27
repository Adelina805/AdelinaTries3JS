//import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three'; // use three.js library

// SETUP

const scene = new THREE.Scene(); // create scene
const camera = new THREE.PerspectiveCamera(75, globalThis.innerWidth / globalThis.innerHeight, 0.1, 1000); // create camera (FOV, aspect ration, view frustrum)
const renderer = new THREE.WebGLRenderer({ // create renderer
  canvas: document.querySelector('#bg'), // use canvas
});

renderer.setPixelRatio(globalThis.devicePixelRatio); // pixel ratio = window pixel ratio
renderer.setSize(globalThis.innerWidth, globalThis.innerHeight); // renderer size = window size, fullscreen
camera.position.z = 30; // move camera back on z axis
camera.position.x = -3; // move camera slighly on x axis

// TORUS

const geometry = new THREE.TorusGeometry(10, 3, 16, 100); // create torus shape
const material = new THREE.MeshStandardMaterial({ color: 0x0B99FF}); // create material
const torus = new THREE.Mesh(geometry, material); // combine shape and material
scene.add(torus); // add shape to scene

// LIGHTS

const pointLight = new THREE.PointLight(0xffffff); // create point light
pointLight.position.set(0, 0, 0); // set position of point light
const ambientLight = new THREE.AmbientLight(0xffffff); // create flood light
scene.add(pointLight, ambientLight); // add lights to scene

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight); // dot location for point light
// const gridHelper = new THREE.GridHelper(200, 50); // horizontal line guide
// scene.add(lightHelper, gridHelper); // add helpers to scene

const controls = new OrbitControls(camera, renderer.domElement); // allow you to move around w/camera

// STARS

function addStar() {
    const geometry = new THREE.OctahedronGeometry(0.25, 0); // create shape
    const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF}); // create material
    const star = new THREE.Mesh(geometry, material); // combine shape and material

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); // randomly generate 3 axis numbers from 0-100

    star.position.set(x, y, z); // set star to randomized axis location
    scene.add(star); // add star to scene
}
Array(200).fill().forEach(addStar); // add array of 200 randomized stars

// BACKGROUND

const spaceTexture = new THREE.TextureLoader().load('space.jpg'); // create texture w/image
scene.background = spaceTexture; // set background to texture

// AVATAR

const adelinaTexture = new THREE.TextureLoader().load('adelina.png'); // create texture w/image
const adelina = new THREE.Mesh( // create new mesh
    new THREE.BoxGeometry(3, 3, 3), // shape
    new THREE.MeshBasicMaterial({map: adelinaTexture})); // material
scene.add(adelina); // add to scene
adelina.position.z = -5; // set position
adelina.position.x = 2; // set position

// DISCO BALL

const ballTexture = new THREE.TextureLoader().load('disco.jpg'); // create texture w/image
const normalTexture = new THREE.TextureLoader().load('normal.jpg'); // create texture w/normal image

const ball = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32), // create shape
    new THREE.MeshStandardMaterial({ // create texture
        map: ballTexture, // image
        normalMap: normalTexture // normal image
    })
);
scene.add(ball); // add to scene
ball.position.z = 30; // set position
ball.position.x = -10; // set position

// SCROLL ANIMATION

function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // where user is 
  
  ball.rotation.x += 0.05; // constant rotation
  ball.rotation.y += 0.04; // constant rotation
  ball.rotation.z += 0.05; // constant rotation

  adelina.rotation.y += 0.01; // constant rotation
  adelina.rotation.z += 0.01; // constant rotation

  camera.position.z = t * -0.01; // update camera position
  camera.position.x = t * -0.0002; // update camera position
  camera.rotation.y = t * -0.0002; // update camera position
}
document.body.onscroll = moveCamera; // update positon
moveCamera(); // call move camera function

// RENDER + ANIMATION LOOP

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01; // constant rotation
  torus.rotation.y += 0.005; // constant rotation
  torus.rotation.z += 0.01; // constant rotation

  ball.rotation.x += 0.005; // constant rotation

  controls.update(); // constant update control and location

  renderer.render(scene, camera); // constant render scene + camera
}
animate(); // call animate function