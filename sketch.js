
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
const sboxes = [];
const stuck = [];
let ball;
let world, engine;
let mConstraint;
let slingshot;
let left;
let right;
let dotImg;
let boxImg;
let bkgImg;
let tope;
let hole;
let noSling = false;
let ropeA;
let rest = 0.5;
let checkbox;
let holes = 0;
function preload() {

  bkgImg = loadImage('skyBackground.png');
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(width / 2, height + 10, width, 100);
  left = new Ground(0, height/2, 100, windowHeight);
  right = new Ground(width, height/2, 100, windowHeight);
  tope = new Ground(width/2, 0, width, 100);
  slider = createSlider(0, 359, 315)
  slider.position(10,5)
  slider.style('width', '160px');
  slider2 = createSlider(0, 100, 60)
  slider2.position(10,25)
  slider2.style('width', '160px');
  slider3 = createSlider(0, 1, 0.5, 0.1)
  slider3.position(10,windowHeight-30)
  slider3.style('width', '160px');

  slider4 = createSlider(-10, 10, 1, 1)
  slider4.position(width/2-140, height-30)
  slider4.style('width', '160px');

  button = createButton('Fire');
  button.position(width/2-250, 5);
  button.mousePressed(myfunc);
  button.style('border', 'none');
  button.style('background-color', 'green');
  button.style('color', 'white')
  button.style('padding', '15px 32px');
  button.style('text-align', 'center');
  button.style('text-decoration', 'none');
  button.style('display', 'inline-block');
  button.style('font-size', '16px');
  button.style('cursor', 'pointer');

  
  chain()

  for (let i = 0; i < 5; i++) {
    boxes[i] = new Box(random(20,windowWidth-20), random(20,windowHeight-20)+10, random(300), random(300));
  }

  for (let i = 0; i < 4; i++) {
    sboxes[i] = new StickyBox(random(20,windowWidth-20), random(20,windowHeight-20)+10, random(150)+10, random(150)+10);
  }
  a=random(20,windowWidth-20)
  b= random(20,windowHeight-20)
  ball = new Ball(a,b, 20,rest);
  hole = new Hole(random(20,windowWidth-20), random(20,windowHeight-20), 22);

}


function chain(){

  var group = Matter.Body.nextGroup(true);

  function makeRect(x, y) {
    var params = {
      collisionFilter: {
        group: group
      }
    }
    w = random(40,50)
    h = random(15,25)
    var body = Bodies.rectangle(x, y, w, h, params);
    body.w = w;
    body.h = h;
    return body;
  }

  var x = random(20,windowWidth-20)
  var y = random(20,windowHeight-20)
  ropeA = Matter.Composites.stack(x, y, 1,random(1,10), 0, 25, makeRect);
  bodies = ropeA.bodies;

  var params = {
    stiffness: 0.8,
    length: 2
  }
  Matter.Composites.chain(ropeA, 0.5, 0, -0.5, 0, params);

  var params = {
    bodyB: ropeA.bodies[0],
    pointB: {
      x: -25,
      y: 0
    },
    pointA: {
      x: x,
      y: y
    },
    stiffness: 0.5
  };

  constraint = Constraint.create(params);
  Matter.Composite.add(ropeA, constraint);

  World.add(world, ropeA);

}

function restart()
{
  World.remove(world, ropeA);
  World.remove(world, ball.body);
  World.remove(world, hole.body);
  for (let box of boxes) {
    World.remove(world, box.body);
  }
  for (let sbox of sboxes) {
    World.remove(world, sbox.body);
  }
  for (let i = 0; i < 5; i++) {
    boxes[i] = new Box(random(20,windowWidth-20), random(20,windowHeight-20)+10, random(300)+10, random(300)+10);
  }
  for (let i = 0; i < 4; i++) {
    sboxes[i] = new StickyBox(random(20,windowWidth-20), random(20,windowHeight-20)+10, random(150)+10, random(150)+10);
  }
  a=random(20,windowWidth-20)
  b= random(20,windowHeight-20)
  ball = new Ball(a,b, 20, rest);
  hole = new Hole(random(20,windowWidth-20), random(20,windowHeight-20)+10, 22);
  chain()
}

function myfunc(){
  let ang = slider.value();
  let pow = slider2.value();
  Matter.Body.setVelocity(ball.body, {x: pow*cos(radians(ang))*0.4, y: pow*sin(radians(ang))*0.4})
  s+=1
}

function keyPressed() {
  if (key == ' ') {
    restart();
    s=0
  }

}


var s = 0

function draw() {

  background(bkgImg);
  Matter.Engine.update(engine, 1000 / 60);
  let ang = slider.value();
  let pow = slider2.value();
  engine.world.gravity.y=slider4.value();
  rest = slider3.value();
  ball.restitution = slider3.value();
  ground.show();
  left.show();
  right.show();
  tope.show();
  stroke(0)
  strokeWeight(3)
  for (let box of boxes) {
    box.show();
  }

  for (let sbox of sboxes) {
    sbox.show();
  }

  for (var i = 0; i < bodies.length; i++) {
    var circle = bodies[i];
    var pos = circle.position;
    var r = circle.circleRadius;
    var angle = circle.angle;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rotate(angle);
    rect(0, 0, 50, 20);
    line(0, 0, 25, 0);
    pop();
  }

  ball.show();
  hole.show();
  line(ball.body.position.x, ball.body.position.y, ball.body.position.x+20*(cos(radians(ang))), 
  ball.body.position.y+20*(sin(radians(ang))));
  fill(97, 78, 110)
  textSize(32)
  strokeWeight(0)
  text('No. of shots - '+s, width-250, 40)
  text('No. of holes - '+holes, width-650, 40)
  textSize(20)
  text('Angle '+ang, 200,20)
  text('Power '+pow, 200,45)
  text('Restitution '+rest, 200, windowHeight-10)
  text('Gravity '+slider4.value(), windowWidth/2+40, windowHeight-10)
  text('Press space to skip' , windowWidth-250, windowHeight-10)
  line()
  

  if (isNaN(ball.body.position.x))
  {
    restart();
    s=0
    holes+=1;
  }

  
}