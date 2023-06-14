class Block {
  constructor(x, v, m, r) {
    this.x = x;
    this.v = v;
    this.m = m;
    this.r = r;
  }

  wallCollide() {
    if (this.x - this.r <= 0) {
      this.v *= -1;
      clackSound = true;
      hitCount++;
    }
  }

  blockCollide(other) {
    let distance = other.x - other.r - (this.x + this.r);
    // let distance2 = (this.x - this.r) - (other.x + other.r);
    if (distance < 0) {
      let sumM = this.m + other.m;
      let newV1 = ((this.m - other.m) * this.v + 2 * other.m * other.v) / sumM;
      let newV2 = (2 * this.m * this.v + (other.m - this.m) * other.v) / sumM;
      this.v = newV1;
      other.v = newV2;
      clackSound = true;
      hitCount++;
    }
  }

  finishCheck(other) {
    let direction_normalized = (other.x - this.x) / abs(other.x - this.x);
    let veldiff = (other.v - this.v) * direction_normalized;
    if (other.x >= 0 && this.v >= 0 && veldiff >= 0) {
      j++;
      if (j > 40) {
        this.v = 0;
        other.v = 0;
        countDiv.style("font-size", "75pt");
        countDiv.style("color", '#39BE3D');
      }
    }
  }

  update() {
    this.x += this.v;
  }

  display() {
    fill(0);
    text(this.m, this.x, height - 2 * this.r - 10);
    fill("#3F7EB1");
    square(this.x, height - this.r, this.r);
  }
}
