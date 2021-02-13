const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let eyes = [];
let theta;

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener('mousemove', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Eye {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    // eye
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = 'orangered';
    ctx.fill();
    ctx.closePath();

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    // ATAN2 <3
    theta = Math.atan2(dy, dx);

    // iris
    let iris_x = this.x + Math.cos(theta) * this.radius / 10;
    let iris_y = this.y + Math.sin(theta) * this.radius / 10;
    let irisRadius = this.radius / 1.2;
    ctx.beginPath()
    ctx.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = 'linen';
    ctx.fill();
    ctx.closePath();

    // pupil
    let pupilRadius = this.radius / 2.5;
    let pupil_x = this.x + Math.cos(theta) * this.radius / 1.9;
    let pupil_y = this.y + Math.sin(theta) * this.radius / 1.9;
    

    ctx.beginPath();
    ctx.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    // pupil reflection
    // ctx.beginPath();
    // ctx.arc(pupil_x-pupilRadius/3 , pupil_y-pupilRadius/3, pupilRadius/4, 0, Math.PI * 2, true);
    // ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    // ctx.fill();
    // ctx.closePath();

    // mouse
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2, true);
    ctx.fillStyle = 'rgba(255,0,255, 0.2)';
    ctx.fill();
    ctx.closePath();
  }
}

function init() {
  eyes = [];
  let overlapping = false;
  let numberOfEyes = 200;
  let protection = 10000;
  let counter = 0;

  while (eyes.length < numberOfEyes && counter < protection) {
    let eye = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.floor(Math.random() * 50) + 1,
    };
    overlapping = false;
    for (let i = 0; i < eyes.length; i++) {
      let previousEye = eyes[i];
      let dx = eye.x - previousEye.x;
      let dy = eye.y - previousEye.y
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < (eye.radius + previousEye.radius)) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      eyes.push(new Eye(eye.x, eye.y, eye.radius));
    }
    counter++;
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < eyes.length; i++) {
    eyes[i].draw();
  }
}

init();
animate();

window.addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
})