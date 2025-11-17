import p5 from 'p5';
import Matter from 'matter-js';

const sketch = (p) => {
  let engine, world;
  let pyramids = [];
  let smallBodies = [];
  let hexagons = [];
  let pyramidRotation = 0;
  let lightningTimer = 0;
  let lightningActive = false;
  let lightningIntensity = 0;
  let moonX = -400;
  let piscesStars = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.frameRate(30);
    
    // Create Matter.js engine
    engine = Matter.Engine.create();
    engine.gravity.y = 0;
    world = engine.world;

    // Define Pisces constellation stars (two fish connected)
    // Western Fish
    piscesStars.push(
      {x: -200, y: -150, size: 3, name: 'Alrescha'},
      {x: -180, y: -140, size: 2},
      {x: -160, y: -135, size: 2},
      {x: -140, y: -145, size: 2},
      {x: -120, y: -160, size: 2},
      {x: -100, y: -170, size: 3},
      // Cord
      {x: -80, y: -165, size: 1},
      {x: -60, y: -160, size: 1},
      {x: -40, y: -155, size: 1},
      {x: -20, y: -150, size: 1},
      {x: 0, y: -145, size: 2},
      // Eastern Fish
      {x: 20, y: -140, size: 2},
      {x: 40, y: -135, size: 2},
      {x: 60, y: -140, size: 3},
      {x: 80, y: -150, size: 2},
      {x: 100, y: -165, size: 2},
      {x: 120, y: -175, size: 3}
    );

    // Create 4 pyramids with tips touching at center
    let pyramidSize = 200;
    let pyramidHeight = pyramidSize * 1.2;
    let offset = pyramidSize / 2;
    
    pyramids = [
      { x: offset, y: 0, z: 0, rotZ: -p.PI/2 },
      { x: -offset, y: 0, z: 0, rotZ: p.PI/2 },
      { x: 0, y: 0, z: offset, rotX: p.PI/2 },
      { x: 0, y: 0, z: -offset, rotX: -p.PI/2 }
    ];
    
    pyramids.forEach(pyr => {
      pyr.size = pyramidSize;
      pyr.height = pyramidHeight;
    });
    
    // Create 50 small pyramids
    for (let i = 0; i < 50; i++) {
      let size = p.random(5, 12);
      let pyramidIndex = Math.floor(p.random(4));
      
      let body = Matter.Bodies.circle(
        p.random(-100, 100),
        p.random(-100, 100),
        size / 2,
        {
          restitution: 0.9,
          friction: 0.05,
          density: 0.01
        }
      );
      Matter.Body.setVelocity(body, {
        x: p.random(-2, 2),
        y: p.random(-2, 2)
      });
      smallBodies.push({
        body: body,
        size: size,
        z: p.random(-100, 100),
        vz: p.random(-2, 2),
        rotX: p.random(p.TWO_PI),
        rotY: p.random(p.TWO_PI),
        rotZ: p.random(p.TWO_PI),
        rotVelX: p.random(-0.05, 0.05),
        rotVelY: p.random(-0.05, 0.05),
        rotVelZ: p.random(-0.05, 0.05),
        pyramidIndex: pyramidIndex,
        r: p.random(50, 255),
        g: p.random(50, 255),
        b: p.random(50, 255),
        alpha: p.random(100, 255)
      });
      Matter.World.add(world, body);
    }

    // Create 2 hexagons
    for (let i = 0; i < 2; i++) {
      let size = p.random(15, 25);
      let pyramidIndex = Math.floor(p.random(4));
      
      let sides = 6;
      let angle = p.TWO_PI / sides;
      let vertices = [];
      for (let j = 0; j < sides; j++) {
        vertices.push({
          x: size * p.cos(angle * j),
          y: size * p.sin(angle * j)
        });
      }
      
      let body = Matter.Bodies.fromVertices(
        p.random(-100, 100),
        p.random(-100, 100),
        [vertices],
        {
          restitution: 0.8,
          friction: 0.1,
          density: 0.02
        }
      );
      Matter.Body.setVelocity(body, {
        x: p.random(-1.5, 1.5),
        y: p.random(-1.5, 1.5)
      });
      hexagons.push({
        body: body,
        size: size,
        z: p.random(-100, 100),
        vz: p.random(-1.5, 1.5),
        rotX: p.random(p.TWO_PI),
        rotY: p.random(p.TWO_PI),
        rotZ: p.random(p.TWO_PI),
        rotVelX: p.random(-0.03, 0.03),
        rotVelY: p.random(-0.03, 0.03),
        rotVelZ: p.random(-0.03, 0.03),
        pyramidIndex: pyramidIndex,
        r: p.random(200, 255),
        g: p.random(100, 200),
        b: p.random(0, 100),
        alpha: p.random(150, 255)
      });
      Matter.World.add(world, body);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  function enforcePyramidBounds(obj) {
    let centerDist = p.sqrt(obj.body.position.x * obj.body.position.x + 
                            obj.body.position.y * obj.body.position.y + 
                            obj.z * obj.z);
    let maxDist = 200;
    
    if (centerDist > maxDist) {
      let scale = maxDist / centerDist;
      Matter.Body.setPosition(obj.body, {
        x: obj.body.position.x * scale,
        y: obj.body.position.y * scale
      });
      obj.z *= scale;
      
      let vel = obj.body.velocity;
      Matter.Body.setVelocity(obj.body, {
        x: -vel.x * 0.8,
        y: -vel.y * 0.8
      });
      obj.vz *= -0.8;
    }
  }

  function drawSkyBackground() {
    // Lightning logic
    lightningTimer++;
    if (lightningTimer > 180) {
      lightningActive = !lightningActive;
      lightningIntensity = lightningActive ? 200 : 0;
      lightningTimer = 0;
    }
    
    // Update moon position
    moonX += 0.5;
    if (moonX > p.windowWidth/2 + 100) {
      moonX = -p.windowWidth/2 - 100;
    }
    
    p.push();
    p.noLights();
    p.translate(0, 0, -500);
    p.noStroke();
    
    let halfWidth = p.windowWidth / 2;
    let halfHeight = p.windowHeight / 2;
    
    // Night sky gradient (dark blue to purple)
    for (let y = -halfHeight; y <= 0; y += 5) {
      let inter = p.map(y, -halfHeight, 0, 0, 1);
      let r = p.lerp(25, 138, inter);
      let g = p.lerp(25, 43, inter);
      let b = p.lerp(112, 226, inter);
      
      if (lightningActive) {
        r = p.min(255, r + lightningIntensity * 0.5);
        g = p.min(255, g + lightningIntensity * 0.7);
        b = p.min(255, b + lightningIntensity * 0.3);
      }
      
      p.fill(r, g, b);
      p.rect(-halfWidth, y, p.windowWidth, 5);
    }
    
    // Draw moon
    p.push();
    p.translate(moonX, -200, 0);
    
    // Moon glow
    for (let i = 3; i > 0; i--) {
      p.fill(255, 255, 230, 10);
      p.ellipse(0, 0, 80 + i * 30, 80 + i * 30);
    }
    
    // Moon surface
    p.fill(255, 255, 230);
    p.ellipse(0, 0, 60, 60);
    
    // Moon craters
    p.fill(230, 230, 210, 100);
    p.ellipse(-10, -5, 15, 15);
    p.ellipse(8, 10, 10, 10);
    p.ellipse(5, -8, 8, 8);
    p.pop();
    
    // Draw Pisces constellation
    p.stroke(255, 255, 255, 180);
    p.strokeWeight(0.5);
    
    // Draw constellation lines
    for (let i = 0; i < piscesStars.length - 1; i++) {
      if (i === 5) continue; // Skip connecting western to eastern fish
      p.line(piscesStars[i].x, piscesStars[i].y, 0, 
             piscesStars[i+1].x, piscesStars[i+1].y, 0);
    }
    
    // Draw stars
    p.noStroke();
    for (let star of piscesStars) {
      // Star twinkle effect
      let twinkle = p.sin(p.millis() * 0.003 + star.x) * 0.3 + 0.7;
      p.fill(255, 255, 255, 200 * twinkle);
      p.ellipse(star.x, star.y, star.size * twinkle, star.size * twinkle);
    }
    
    // Translucent white gradient overlay at top
    for (let y = -halfHeight; y <= -halfHeight + 100; y += 5) {
      let alpha = p.map(y, -halfHeight, -halfHeight + 100, 80, 0);
      p.fill(255, 255, 255, alpha);
      p.rect(-halfWidth, y, p.windowWidth, 5);
    }
    
    // Sunset gradient at bottom (purple to orange)
    for (let y = 0; y <= halfHeight; y += 5) {
      let inter = p.map(y, 0, halfHeight, 0, 1);
      let r = p.lerp(138, 255, inter);
      let g = p.lerp(43, 149, inter);
      let b = p.lerp(226, 87, inter);
      p.fill(r, g, b);
      p.rect(-halfWidth, y, p.windowWidth, 5);
    }
    
    p.pop();
  }

  function drawSimpleWater() {
    p.push();
    p.translate(0, 250, 0);
    p.rotateX(p.PI / 2);
    
    let waveTime = p.millis() * 0.001;
    
    // Moon reflection on water
    let moonReflectX = moonX;
    p.fill(255, 255, 200, 30);
    p.noStroke();
    for (let i = 0; i < 5; i++) {
      let offsetX = p.sin(waveTime + i) * 20;
      let offsetZ = i * 20 - 40;
      p.ellipse(moonReflectX + offsetX, offsetZ, 40 - i * 5, 20);
    }
    
    p.fill(64, 224, 208, 100);
    p.stroke(95, 158, 160, 80);
    p.strokeWeight(0.3);
    
    let waterSize = Math.max(p.windowWidth, p.windowHeight);
    
    for (let x = -waterSize; x <= waterSize; x += 40) {
      p.beginShape(p.TRIANGLE_STRIP);
      for (let z = -waterSize; z <= waterSize; z += 40) {
        let wave = p.sin(x * 0.02 + waveTime) * 10 + p.cos(z * 0.02 + waveTime) * 10;
        p.vertex(x, z, wave);
        p.vertex(x + 40, z, wave);
      }
      p.endShape();
    }
    p.pop();
  }

  p.draw = () => {
    drawSkyBackground();
    
    if (p.frameCount % 2 === 0) {
      Matter.Engine.update(engine, 1000 / 30);
    }

    // Lighting with moon illumination
    p.ambientLight(100 + p.abs(moonX) * 0.1);
    p.directionalLight(255, 255, 230, moonX * 0.001, 0.5, -1);
    p.pointLight(255, 255, 255, 200, -200, 200);
    
    if (lightningActive) {
      p.pointLight(255, 255, 255, -200, -100, -300);
    }

    pyramidRotation += 0.01;
    p.rotateY(pyramidRotation);

    drawSimpleWater();

    // Draw 4 pyramids
    pyramids.forEach(pyr => {
      p.push();
      p.translate(pyr.x, pyr.y, pyr.z);
      if (pyr.rotX) p.rotateX(pyr.rotX);
      if (pyr.rotZ) p.rotateZ(pyr.rotZ);
      
      p.stroke(25);
      p.strokeWeight(1);
      p.noFill();
      
      let s = pyr.size / 2;
      let h = pyr.height / 2;
      
      p.beginShape(p.LINES);
      p.vertex(-s, h, -s); p.vertex(s, h, -s);
      p.vertex(s, h, -s); p.vertex(s, h, s);
      p.vertex(s, h, s); p.vertex(-s, h, s);
      p.vertex(-s, h, s); p.vertex(-s, h, -s);
      p.vertex(-s, h, -s); p.vertex(0, -h, 0);
      p.vertex(s, h, -s); p.vertex(0, -h, 0);
      p.vertex(s, h, s); p.vertex(0, -h, 0);
      p.vertex(-s, h, s); p.vertex(0, -h, 0);
      p.endShape();
      p.pop();
    });

    // Draw small pyramids
    for (let obj of smallBodies) {
      obj.z += obj.vz;
      obj.rotY += obj.rotVelY;

      enforcePyramidBounds(obj);

      p.push();
      p.translate(obj.body.position.x, obj.body.position.y, obj.z);
      p.rotateY(obj.rotY);
      
      p.fill(obj.r, obj.g, obj.b, obj.alpha);
      p.noStroke();
      
      let sz = obj.size / 2;
      p.beginShape(p.TRIANGLES);
      p.vertex(0, -sz, 0); p.vertex(-sz, sz, -sz); p.vertex(sz, sz, -sz);
      p.vertex(0, -sz, 0); p.vertex(sz, sz, -sz); p.vertex(sz, sz, sz);
      p.vertex(0, -sz, 0); p.vertex(sz, sz, sz); p.vertex(-sz, sz, sz);
      p.vertex(0, -sz, 0); p.vertex(-sz, sz, sz); p.vertex(-sz, sz, -sz);
      p.endShape();
      p.pop();
    }

    // Draw hexagons
    for (let hex of hexagons) {
      hex.z += hex.vz;
      hex.rotY += hex.rotVelY;

      enforcePyramidBounds(hex);

      p.push();
      p.translate(hex.body.position.x, hex.body.position.y, hex.z);
      p.rotateY(hex.rotY);
      
      p.fill(hex.r, hex.g, hex.b, hex.alpha);
      p.noStroke();
      
      p.beginShape();
      for (let i = 0; i < 6; i++) {
        let angle = p.TWO_PI / 6 * i;
        p.vertex(hex.size * p.cos(angle), hex.size * p.sin(angle), 0);
      }
      p.endShape(p.CLOSE);
      p.pop();
    }
  };
};

new p5(sketch);
