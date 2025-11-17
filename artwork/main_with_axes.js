import * as THREE from 'three';
import Matter from 'matter-js';

// Global variables
let scene, camera, renderer, water;
let engine, world;
let pyramidGroup, moonGroup, moon, moonLight;
let pyramids = [];
let physicsBodies = [];
let moonPhase = 0;
let time = 0;

// Initialize Three.js
scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000033, 100, 1500);

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 100, 500);
camera.lookAt(0, 0, 0);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Physics
engine = Matter.Engine.create();
engine.gravity.y = 0;
world = engine.world;

// Lighting
scene.add(new THREE.AmbientLight(0x101030, 0.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
dirLight.position.set(200, 200, 200);
scene.add(dirLight);

moonLight = new THREE.PointLight(0xffffee, 1.5, 2000);
scene.add(moonLight);

// Sky background
const skyGeo = new THREE.PlaneGeometry(2000, 1200);
const skyMat = new THREE.MeshBasicMaterial({ color: 0x1a1a3a });
const sky = new THREE.Mesh(skyGeo, skyMat);
sky.position.z = -600;
scene.add(sky);

// Create Moon
moonGroup = new THREE.Group();
moon = new THREE.Mesh(
  new THREE.SphereGeometry(30, 32, 32),
  new THREE.MeshPhongMaterial({ color: 0xffffee, emissive: 0xffffcc, emissiveIntensity: 0.5 })
);
moonGroup.add(moon);
scene.add(moonGroup);

// Axis Helpers
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// Create label sprite
function createLabel(text, color, pos) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.font = '40px Arial';
  ctx.fillText(text, 10, 45);
  
  const texture = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
  sprite.position.copy(pos);
  sprite.scale.set(80, 20, 1);
  return sprite;
}

// Add labels
scene.add(createLabel('X-East/West', '#ff0000', new THREE.Vector3(320, 0, 0)));
scene.add(createLabel('Y-Up/Down', '#00ff00', new THREE.Vector3(0, 320, 0)));
scene.add(createLabel('Z-North/South', '#0000ff', new THREE.Vector3(0, 0, 320)));

// Grid
const grid = new THREE.GridHelper(600, 30, 0x444444, 0x222222);
grid.position.y = -240;
scene.add(grid);

// Water
water = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000, 50, 50),
  new THREE.MeshPhongMaterial({ color: 0x40e0d0, transparent: true, opacity: 0.7 })
);
water.rotation.x = -Math.PI / 2;
water.position.y = -240;
scene.add(water);

// Create Pyramids
pyramidGroup = new THREE.Group();

for (let i = 0; i < 4; i++) {
  const pyramid = new THREE.Mesh(
    new THREE.ConeGeometry(100, 240, 4),
    new THREE.MeshPhongMaterial({ color: 0x444466, wireframe: true })
  );
  
  if (i === 0) { pyramid.position.set(100, 0, 0); pyramid.rotation.z = -Math.PI/2; }
  if (i === 1) { pyramid.position.set(-100, 0, 0); pyramid.rotation.z = Math.PI/2; }
  if (i === 2) { pyramid.position.set(0, 0, 100); pyramid.rotation.x = Math.PI/2; }
  if (i === 3) { pyramid.position.set(0, 0, -100); pyramid.rotation.x = -Math.PI/2; }
  
  pyramids.push(pyramid);
  pyramidGroup.add(pyramid);
}

scene.add(pyramidGroup);

// Small objects
for (let i = 0; i < 30; i++) {
  const size = 10;
  const mesh = new THREE.Mesh(
    new THREE.ConeGeometry(size/2, size, 3),
    new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff })
  );
  
  mesh.position.set(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  );
  
  pyramidGroup.add(mesh);
  
  const body = Matter.Bodies.circle(mesh.position.x, mesh.position.y, size/2);
  physicsBodies.push({ mesh, body, vz: (Math.random() - 0.5) * 2 });
  Matter.World.add(world, body);
}

// Debug display
const debugDiv = document.createElement('div');
debugDiv.id = 'debug';
debugDiv.style.position = 'absolute';
debugDiv.style.top = '10px';
debugDiv.style.left = '10px';
debugDiv.style.color = 'white';
debugDiv.style.fontFamily = 'monospace';
debugDiv.style.background = 'rgba(0,0,0,0.5)';
debugDiv.style.padding = '10px';
document.body.appendChild(debugDiv);

// Animation
function animate() {
  requestAnimationFrame(animate);
  
  time += 0.01;
  
  // Update physics
  Matter.Engine.update(engine, 1000 / 60);
  
  // Update moon
  moonPhase += 0.002;
  if (moonPhase > Math.PI) moonPhase = 0;
  
  const moonX = Math.cos(moonPhase) * 600;
  const moonY = Math.sin(moonPhase) * 300;
  moonGroup.position.set(moonX, moonY, -300);
  moonLight.position.copy(moonGroup.position);
  
  // Rotate pyramids
  pyramidGroup.rotation.y += 0.01;
  
  // Update physics bodies
  physicsBodies.forEach(obj => {
    obj.mesh.position.x = obj.body.position.x;
    obj.mesh.position.y = obj.body.position.y;
    obj.mesh.position.z += obj.vz;
    
    // Bounce
    if (Math.abs(obj.mesh.position.x) > 100) obj.body.velocity.x *= -1;
    if (Math.abs(obj.mesh.position.y) > 100) obj.body.velocity.y *= -1;
    if (Math.abs(obj.mesh.position.z) > 100) obj.vz *= -1;
    
    obj.mesh.rotation.x += 0.02;
    obj.mesh.rotation.y += 0.01;
  });
  
  // Update debug
  debugDiv.innerHTML = 'Moon X: ' + moonX.toFixed(0) + ' Y: ' + moonY.toFixed(0);
  
  renderer.render(scene, camera);
}

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
