
class Ball {
  constructor(x, y, r, k) {
    const options = {
      restitution: k
    }
    this.body = Matter.Bodies.circle(x, y, r, options);
    // this.body.mass *= 4;
    Matter.Body.setMass(this.body, this.body.mass);
    Matter.World.add(world, this.body);
    this.r = r;
  }
  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    fill(255,255,0);
    circle(pos.x, pos.y, this.r);

  }


}