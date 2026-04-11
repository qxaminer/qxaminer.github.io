import * as THREE from 'three';
import Matter from 'matter-js';

// Scene setup
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000033, 100, 1500);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
document.body.appendChild(renderer.domElement);

// Physics setup
const engine = Matter.Engine.create();
engine.gravity.y = 0;
const world = engine.world;

// Camera position
camera.position.set(0, 100, 500);
camera.lookAt(0, 0, 0);

// Lighting
const ambientLight = new THREE.AmbientLight(0x101030, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(200, 200, 200);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Moon light with strong specular
const moonLight = new THREE.PointLight(0xffffee, 1.5, 2000);
moonLight.castShadow = true;
moonLight.shadow.camera.near = 1;
moonLight.shadow.camera.far = 2000;
scene.add(moonLight);

// Add moon glow light
const moonGlow = new THREE.PointLight(0xffffcc, 0.5, 500);
scene.add(moonGlow);

// Sky gradient background
const skyGeometry = new THREE.PlaneGeometry(2000, 1200);
const skyCanvas = document.createElement('canvas');
skyCanvas.width = 512;
skyCanvas.height = 512;
const skyContext = skyCanvas.getContext('2d');

// Create gradient
const gradient = skyContext.createLinearGradient(0, 0, 0, 512);
gradient.addColorStop(0, '#0a0a2a'); // Very dark blue top
gradient.addColorStop(0.3, '#4a1a6a'); // Dark purple
gradient.addColorStop(0.7, '#a84a2a'); // Dark orange
gradient.addColorStop(1, '#FF9557'); // Orange bottom

skyContext.fillStyle = gradient;
skyContext.fillRect(0, 0, 512, 512);

const skyTexture = new THREE.CanvasTexture(skyCanvas);
const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.DoubleSide });
const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
skyMesh.position.z = -600;
scene.add(skyMesh);

// Moon with realistic physics - starts at eastern horizon
const moonGroup = new THREE.Group();
const moonGeometry = new THREE.SphereGeometry(1, 32, 32); // Base size, will be scaled
const moonMaterial = new THREE.MeshPhongMaterial({ 
  color: 0xffffee,
  emissive: 0xffffcc,
  emissiveIntensity: 0.8,
  shininess: 1
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

// Add moon halo
const moonHaloGeometry = new THREE.RingGeometry(1.2, 2, 32);
const moonHaloMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffcc,
  transparent: true,
  opacity: 0.3,
  side: THREE.DoubleSide
});
const moonHalo = new THREE.Mesh(moonHaloGeometry, moonHaloMaterial);
moon.add(moonHalo);
moonGroup.add(moon);
scene.add(moonGroup);

// Moon physics variables
let moonPhase = 0; // 0 = horizon east, PI/2 = zenith, PI = horizon west
const moonOrbitRadius = 700; // Distance from center
const moonBaseSize = 40; // Size at horizon
const moonApogeeSize = 25; // Size at highest point
const moonRiseAzimuth = Math.PI * 0.6; // Rise from East-Northeast (108 degrees)

// Pisces constellation
const starGeometry = new THREE.BufferGeometry();
const starPositions = [
  -200, 150, -400,  -180, 140, -400,  -160, 135, -400,
  -140, 145, -400,  -120, 160, -400,  -100, 170, -400,
  -80, 165, -400,   -60, 160, -400,   -40, 155, -400,
  -20, 150, -400,   0, 145, -400,     20, 140, -400,
  40, 135, -400,    60, 140, -400,    80, 150, -400,
  100, 165, -400,   120, 175, -400
];
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 3 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Water plane with specular highlights
const waterGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
const waterMaterial = new THREE.MeshPhongMaterial({ 
  color: 0x40e0d0,
  transparent: true,
  opacity: 0.7,
  shininess: 200,
  specular: 0xffffff,
  reflectivity: 1,
  side: THREE.DoubleSide
});
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI / 2;
water.position.y = -240;
water.receiveShadow = true;
scene.add(water);

// Create 4 pyramids with tips touching - with emissive pulsing
const pyramids = [];
const pyramidGroup = new THREE.Group();
const pyramidLights = [];

function createPyramid(x, y, z, rotationX, rotationZ) {
  const geometry = new THREE.ConeGeometry(100, 240, 4);
  const material = new THREE.MeshPhongMaterial({ 
    color: 0x444466,
    emissive: 0x0044ff,
    emissiveIntensity: 0.2,
    wireframe: true,
    shininess: 100,
    specular: 0x8888ff
  });
  const pyramid = new THREE.Mesh(geometry, material);
  pyramid.position.set(x, y, z);
  if (rotationX) pyramid.rotation.x = rotationX;
  if (rotationZ) pyramid.rotation.z = rotationZ;
  pyramid.castShadow = true;
  pyramid.receiveShadow = true;
  
  // Add point light at pyramid tip
  const pyramidLight = new THREE.PointLight(0x4488ff, 0.5, 150);
  pyramidLight.position.copy(pyramid.position);
  pyramidLights.push(pyramidLight);
  pyramidGroup.add(pyramidLight);
  
  return pyramid;
}

// Create 4 pyramids pointing inward
pyramids.push(createPyramid(100, 0, 0, 0, -Math.PI/2));
pyramids.push(createPyramid(-100, 0, 0, 0, Math.PI/2));
pyramids.push(createPyramid(0, 0, 100, Math.PI/2, 0));
pyramids.push(createPyramid(0, 0, -100, -Math.PI/2, 0));

pyramids.forEach(p => pyramidGroup.add(p));
scene.add(pyramidGroup);

// Create axis helpers and labels
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

// Create axis labels
function createAxisLabel(text, color, position) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  context.fillStyle = color;
  context.font = 'Bold 48px Arial';
  context.fillText(text, 10, 50);
  
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.copy(position);
  sprite.scale.set(80, 20, 1);
  return sprite;
}

// Add axis labels
const xLabel = createAxisLabel('X (East-West)', '#ff0000', new THREE.Vector3(320, 0, 0));
const yLabel = createAxisLabel('Y (Up-Down)', '#00ff00', new THREE.Vector3(0, 320, 0));
const zLabel = createAxisLabel('Z (North-South)', '#0000ff', new THREE.Vector3(0, 0, 320));
scene.add(xLabel);
scene.add(yLabel);
scene.add(zLabel);

// Add coordinate grid
const gridHelper = new THREE.GridHelper(600, 30, 0x444444, 0x222222);
gridHelper.position.y = -240;
scene.add(gridHelper);

// Add cardinal direction labels  
const northLabel = createAxisLabel('NORTH (-Z)', '#00ffff', new THREE.Vector3(0, -200, -400));
const southLabel = createAxisLabel('SOUTH (+Z)', '#00ffff', new THREE.Vector3(0, -200, 400));
const eastLabel = createAxisLabel('EAST (+X)', '#ffff00', new THREE.Vector3(400, -200, 0));
const westLabel = createAxisLabel('WEST (-X)', '#ffff00', new THREE.Vector3(-400, -200, 0));
scene.add(northLabel);
scene.add(southLabel);
scene.add(eastLabel);
scene.add(westLabel);

// Moon position debug text
const moonDebugDiv = document.createElement('div');
moonDebugDiv.style.position = 'absolute';
moonDebugDiv.style.top = '10px';
moonDebugDiv.style.left = '10px';
moonDebugDiv.style.color = 'white';
moonDebugDiv.style.fontFamily = 'monospace';
moonDebugDiv.style.fontSize = '14px';
moonDebugDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
moonDebugDiv.style.padding = '10px';
moonDebugDiv.style.borderRadius = '5px';
moonDebugDiv.id = 'moonDebug';
document.body.appendChild(moonDebugDiv);


// Small pyramids and hexagons
const smallObjects = [];
const physicsBodies = [];

// Create small pyramids with specular materials
for (let i = 0; i < 50; i++) {
  const size = Math.random() * 7 + 5;
  const geometry = new THREE.ConeGeometry(size/2, size, 3);
  const material = new THREE.MeshPhongMaterial({ 
    color: new THREE.Color(Math.random(), Math.random(), Math.random()),
    transparent: true,
    opacity: Math.random() * 0.5 + 0.5,
    shininess: 100,
    specular: 0xffffff,
    emissive: new THREE.Color(Math.random() * 0.2, Math.random() * 0.2, Math.random() * 0.2),
    emissiveIntensity: 0.3
  });
  const mesh = new THREE.Mesh(geometry, material);
  
  // Start inside the pyramid lattice structure
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 80;
  mesh.position.set(
    Math.cos(angle) * radius,
    Math.random() * 100 - 50,
    Math.sin(angle) * radius
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  pyramidGroup.add(mesh);
  smallObjects.push(mesh);
  
  // Add physics body
  const body = Matter.Bodies.circle(mesh.position.x, mesh.position.y, size/2, {
    restitution: 0.9,
    friction: 0.05
  });
  Matter.Body.setVelocity(body, {
    x: (Math.random() - 0.5) * 4,
    y: (Math.random() - 0.5) * 4
  });
  physicsBodies.push({ mesh, body, vz: (Math.random() - 0.5) * 4 });
  Matter.World.add(world, body);
}

// Create hexagons with specular
for (let i = 0; i < 3; i++) {
  const size = Math.random() * 10 + 15;
  const geometry = new THREE.CylinderGeometry(size, size, 5, 6);
  const material = new THREE.MeshPhongMaterial({ 
    color: new THREE.Color(1, Math.random() * 0.5 + 0.5, Math.random() * 0.2),
    transparent: true,
    opacity: 0.8,
    shininess: 150,
    specular: 0xffff00,
    emissive: 0xff6600,
    emissiveIntensity: 0.2
  });
  const mesh = new THREE.Mesh(geometry, material);
  
  // Start inside the pyramid lattice
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 80;
  mesh.position.set(
    Math.cos(angle) * radius,
    Math.random() * 100 - 50,
    Math.sin(angle) * radius
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  pyramidGroup.add(mesh);
  smallObjects.push(mesh);
  
  const vertices = [];
  for (let j = 0; j < 6; j++) {
    const angle = (Math.PI * 2 / 6) * j;
    vertices.push({ x: Math.cos(angle) * size, y: Math.sin(angle) * size });
  }
  
  const body = Matter.Bodies.fromVertices(mesh.position.x, mesh.position.y, [vertices], {
    restitution: 0.8,
    friction: 0.1
  });
  Matter.Body.setVelocity(body, {
    x: (Math.random() - 0.5) * 3,
    y: (Math.random() - 0.5) * 3
  });
  physicsBodies.push({ mesh, body, vz: (Math.random() - 0.5) * 3 });
  Matter.World.add(world, body);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation variables
let time = 0;

// Check if object is inside pyramid lattice structure
function isInsidePyramidLattice(position) {
  // The lattice is roughly a diamond shape centered at origin
  const maxRadius = 100;
  const height = 120;
  
  // Height constraint
  if (Math.abs(position.y) > height) return false;
  
  // Radial constraint that tapers with height
  const heightRatio = 1 - Math.abs(position.y) / height;
  const allowedRadius = maxRadius * heightRatio;
  const currentRadius = Math.sqrt(position.x * position.x + position.z * position.z);
  
  return currentRadius <= allowedRadius;
}

// Update moon position with realistic physics
function updateMoonPosition() {
  // Moon rises from east, sets in west (like real moon)
  // Phase goes from 0 (horizon) to PI (opposite horizon)
  moonPhase += 0.002; // Slower, more realistic movement
  if (moonPhase > Math.PI) {
    moonPhase = 0; // Reset when moon sets
  }
  
  // Calculate moon position on arc
  // Height follows a parabolic arc (highest at PI/2)
  const moonHeight = Math.sin(moonPhase) * 300; // Max height at screen top
  
  // Horizontal movement from East to West with proper azimuth
  const moonX = -Math.cos(moonPhase + moonRiseAzimuth) * moonOrbitRadius;
  const moonZ = -Math.abs(Math.sin(moonPhase) * 200) - 200; // Keep moon in background
  
  // Set moon position
  moonGroup.position.set(moonX, moonHeight, moonZ);
  
  // Moon appears larger near horizon (atmospheric magnification illusion)
  const sizeFactor = 1 - Math.sin(moonPhase) * 0.4; // 40% smaller at zenith
  const currentMoonSize = moonBaseSize * sizeFactor;
  moonGroup.scale.setScalar(currentMoonSize);
  
  // Update debug display
  const debugDiv = document.getElementById('moonDebug');
  if (debugDiv) {
    debugDiv.innerHTML = `
      <strong>Coordinate System:</strong><br>
      X-axis (Red): East(+) / West(-)<br>
      Y-axis (Green): Up(+) / Down(-)<br>
      Z-axis (Blue): South(+) / North(-)<br>
      <br>
      <strong>Moon Position:</strong><br>
      X: ${moonX.toFixed(1)}<br>
      Y: ${moonHeight.toFixed(1)}<br>
      Z: ${moonZ.toFixed(1)}<br>
      Phase: ${(moonPhase * 180 / Math.PI).toFixed(1)}°<br>
      Size: ${currentMoonSize.toFixed(1)}
    `;
  }
  
  // Update light positions
  moonLight.position.copy(moonGroup.position);
  moonGlow.position.copy(moonGroup.position);
  
  // Adjust moon color based on height (more orange near horizon)
  const heightRatio = moonHeight / 300;
  const r = 1;
  const g = 1 - (1 - heightRatio) * 0.2; // More orange near horizon
  const b = 0.93 - (1 - heightRatio) * 0.3;
  moon.material.color.setRGB(r, g, b);
  moon.material.emissive.setRGB(r * 0.8, g * 0.8, b * 0.6);
  
  // Adjust moon light intensity (dimmer near horizon due to atmosphere)
  moonLight.intensity = 1.0 + heightRatio * 0.5;
  moonGlow.intensity = 0.3 + heightRatio * 0.2;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  time += 0.01;
  
  // Update physics
  Matter.Engine.update(engine, 1000 / 60);
  
  // Update moon with realistic movement
  updateMoonPosition();
  
  // Rotate pyramid group
  pyramidGroup.rotation.y += 0.01;
  
  // Pulsing/flickering pyramid lights
  pyramids.forEach((pyramid, index) => {
    const pulse = Math.sin(time * 3 + index * Math.PI * 0.5) * 0.3 + 0.7;
    const flicker = Math.random() > 0.95 ? Math.random() * 0.5 : 0;
    pyramid.material.emissiveIntensity = pulse * 0.4 + flicker;
    pyramidLights[index].intensity = pulse * 0.8 + flicker;
  });
  
  // Moon halo rotation
  moonHalo.rotation.z += 0.01;
  
  // Animate water with moon reflection
  const waterVertices = water.geometry.attributes.position;
  for (let i = 0; i < waterVertices.count; i++) {
    const x = waterVertices.getX(i);
    const y = waterVertices.getY(i);
    const waveHeight = Math.sin(x * 0.02 + time) * 10 + Math.cos(y * 0.015 + time * 1.3) * 8;
    waterVertices.setZ(i, waveHeight);
  }
  waterVertices.needsUpdate = true;
  
  // Update physics objects - constrain to pyramid lattice
  physicsBodies.forEach(obj => {
    // Update from Matter.js physics
    obj.mesh.position.x = obj.body.position.x;
    obj.mesh.position.y = obj.body.position.y;
    
    // Handle Z movement
    obj.mesh.position.z += obj.vz;
    
    // Check if inside pyramid lattice structure
    if (!isInsidePyramidLattice(obj.mesh.position)) {
      // Calculate center direction and bounce back
      const dir = new THREE.Vector3(
        obj.mesh.position.x,
        obj.mesh.position.y,
        obj.mesh.position.z
      ).normalize();
      
      // Constrain to lattice boundary
      const maxRadius = 100 * (1 - Math.abs(obj.mesh.position.y) / 120);
      const currentRadius = Math.sqrt(obj.mesh.position.x * obj.mesh.position.x + obj.mesh.position.z * obj.mesh.position.z);
      
      if (currentRadius > maxRadius) {
        const scale = maxRadius / currentRadius;
        obj.mesh.position.x *= scale;
        obj.mesh.position.z *= scale;
        Matter.Body.setPosition(obj.body, {
          x: obj.mesh.position.x,
          y: obj.mesh.position.y
        });
      }
      
      // Height constraints
      if (Math.abs(obj.mesh.position.y) > 120) {
        obj.mesh.position.y = Math.sign(obj.mesh.position.y) * 120;
        Matter.Body.setPosition(obj.body, {
          x: obj.mesh.position.x,
          y: obj.mesh.position.y
        });
      }
      
      // Reverse velocities
      const vel = obj.body.velocity;
      Matter.Body.setVelocity(obj.body, {
        x: -vel.x * 0.8,
        y: -vel.y * 0.8
      });
      obj.vz *= -0.8;
    }
    
    // Rotate objects
    obj.mesh.rotation.x += 0.02;
    obj.mesh.rotation.y += 0.01;
    
    // Add subtle emissive pulsing to small objects
    if (obj.mesh.material.emissive) {
      obj.mesh.material.emissiveIntensity = 0.3 + Math.sin(time * 2 + obj.mesh.position.x) * 0.1;
    }
  });
  
  // Twinkle stars
  stars.material.size = 3 + Math.sin(time * 3) * 0.5;
  
  renderer.render(scene, camera);
}

animate();
