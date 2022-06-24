import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

const render_min = -50, render_max = 50, a0 = 2.5, sprite = 1;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(100, 100, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let orbit = new OrbitControls(camera, renderer.domElement);
orbit.target = new THREE.Vector3(0, 0, 0);
orbit.maxPolarAngle = Math.PI / 2;
orbit.minDistance = 50;
orbit.maxDistance = 200;
orbit.autoRotateSpeed = 2;
orbit.autoRotate = true;

const material_line = new THREE.LineBasicMaterial({ color: 0xaaaaaa });

const line_points = [];
line_points.push([new THREE.Vector3(100, 0, 0), new THREE.Vector3(-100, 0, 0)]);
line_points.push([new THREE.Vector3(0, 100, 0), new THREE.Vector3(0, -100, 0)]);
line_points.push([new THREE.Vector3(0, 0, 100), new THREE.Vector3(0, 0, -100)]);

for (let i = 0; i < line_points.length; i++) {
	const geometry_line = new THREE.BufferGeometry().setFromPoints(line_points[i]);
	const line = new THREE.Line(geometry_line, material_line);
	scene.add(line);
}

for (let x = render_min; x <= render_max; x += sprite) {
	for (let y = render_min; y <= render_max; y += sprite) {
		for (let z = render_min; z <= render_max; z += sprite) {

			let r = distance3(x, y, z);
			let r_xy = distance2(x, y);
			let phi = Math.atan2(z, r_xy);
			let theta = Math.atan2(y, x);

			//let prob = ((a0 ** (-3 / 2)) * ((r / a0) ** 2 )* Math.exp(-r / 3 / a0) * (Math.sin(theta) ** 2)) ** 2 * (Math.cos(phi) ** 2 - Math.sin(phi) ** 2) / Math.PI;	// 3d
			let prob = (a0 ** (-3 / 2) * (6 - r / a0) * (r / a0) * Math.exp(-r / 3 / a0) * Math.cos(theta))**2 /(5/a0);		// 3p

			if (Math.random() <= prob) {
				//console.log([x, y, z]);
				console.log(prob);
				const geometry_electron = new THREE.SphereGeometry(0.5, 4, 4).translate(x, y, z);
				const material_electron = new THREE.MeshBasicMaterial({ color: new THREE.Color(.6,  1, prob*10) });
				//const material_electron = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, prob)});
				const electron = new THREE.Mesh(geometry_electron, material_electron);
				scene.add(electron);
			}
		}
	}
}


function animate() {
	requestAnimationFrame(animate);
	orbit.update();
	renderer.render(scene, camera);
}

animate();



function R(r) {
	//return 2 * Math.exp(-r / a0) / (a0 ** (3 / 2));
	return 4 / (81 * (30 ** (0.5)) * a0 ** (3 / 2)) * (r ** 2) / (a0 ** 2) * Math.exp(-r / 3 / a0);
}

function Theta(theta) {
	//return 2 ** (-1 / 2);
	return (10 ** 0.5) / 4 * (3 * (Math.cos(theta) ** 2) - 1);
	//return (15 ** 0.5) / 2 * Math.sin(theta) * Math.cos(theta);
}

function Phi(phi) {
	return (2 * Math.PI) ** (-1 / 2);
}

function distance3(x, y, z) {
	return (x ** 2 + y ** 2 + z ** 2) ** (1 / 2);
}

function distance2(x, y) {
	return (x ** 2 + y ** 2) ** (1 / 2);
}

