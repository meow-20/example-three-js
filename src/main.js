import * as THREE from 'three';

// importing controls for drag and move objects by the user
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// savthi pehla scene banao
// pachi camera create karo with PerspectiveCamera
// then object banao which has some Shape and Material
// pachi render karao
// light lagavi hoi to lagao !! for the aesthetics

const scene = new THREE.Scene();
scene.background = new THREE.Color(0.05, 0.05, 0.05);
// background color: gray

const texture = new THREE.TextureLoader().load("./textures/texture.jpg"); // loading image file
const bw_texture = new THREE.TextureLoader().load("./textures/bw_texture.png"); // loading black & white image file

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 7; // distance of the camera to the origin point in z

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#app").appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(3, 3, 3);
const material = new THREE.MeshStandardMaterial({
    color: "red",
    map: texture,
    bumpMap: bw_texture,
    roughness: 0.2,
    metalness: 0.2,
    // normalMap: texture,    
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);    // adding the shape to the scene

const geometry_2 = new THREE.SphereGeometry(0.5, 32, 16);
const material_2 = new THREE.MeshBasicMaterial({color: "white"});
const bulb = new THREE.Mesh(geometry_2, material_2);
scene.add(bulb);    // adding the shape to the scene

// camera.lookAt(cube.position);

// lights
// lights to all the screen
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);


const pointLight = new THREE.PointLight(0xffffff, 1, 100, 0.5);
scene.add(pointLight);
// pointLight.position.x = 4;
// pointLight.position.y = 4;
// pointLight.position.z = 8;

bulb.position.set(10, 0, 5);   
pointLight.position.set(10, 0, 5); 

// controls
const controls = new OrbitControls(camera, renderer.domElement);


// animate the scene's object
let theta = 0;
animate();

function animate() {

    controls.update();

    theta += 0.01;

    let sinTheta = Math.sin(theta);
    let cosTheta = Math.cos(theta);

    let f_sin = 5 * sinTheta;
    let f_cos = 3 * cosTheta;

    // bulb.position.set(f_sin, 0, f_cos);   
    // pointLight.position.set(f_sin, 0, f_cos);  

    // set position of bulb for each axis (x, y and z)
    // set the position of pointLight exactly equal to the position of bulb
    // such that it will give the effect of the light emitting from the bulb on the cube


    // cube.position.x = 2 * sinTheta;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;


    renderer.render(scene, camera);    // rendering the scene through the camera

    requestAnimationFrame(animate)   // calling this function again and again for continuous animation

};