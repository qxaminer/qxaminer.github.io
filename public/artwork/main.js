import p5 from 'p5';

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background('#aaaaaa');
    
    // Draw fading COGENT-EYE text in background
    const textAlpha = (p.sin(p.frameCount * 0.02) + 1) / 2 * 150 + 50;
    p.fill(100, 100, 100, textAlpha);
    p.textFont('monospace');
    p.textSize(80);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('COGENT-EYE', p.width / 2, p.height / 2);
    
    p.stroke(25);
    p.strokeWeight(0.5);
    p.noFill();

    const side = 200;
    const h = side * (Math.sqrt(3) / 2);
    const cx = p.width / 2;
    const cy = p.height / 2;

    const x1 = cx;
    const y1 = cy - h * (2 / 3);
    const x2 = cx - side / 2;
    const y2 = cy + h * (1 / 3);
    const x3 = cx + side / 2;
    const y3 = cy + h * (1 / 3);

    p.triangle(x1, y1, x2, y2, x3, y3);
  };
};

new p5(sketch);
