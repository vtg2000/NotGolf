class Hole {
    constructor(x, y, r) {
      const options = {
        restitution: 1,
        isStatic: true
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

      fill(0);
      circle(pos.x, pos.y, this.r);

  
    }
  
  
  }