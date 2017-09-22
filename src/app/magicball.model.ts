import { Mesh } from 'three';

export class MagicBall {

  public mainMesh: Mesh;
  public rotationSpeed: number;
  public rotationSpeedDefault: number;
  public rotating: boolean;

  constructor (mesh: Mesh) {
    this.rotating = true;
    this.mainMesh = mesh;
    this.rotationSpeed = this.rotationSpeedDefault = Math.random() * 0.4;
  }

  animate() {
    this.mainMesh.rotateY(this.rotationSpeed);
  }

  public toggleRotation(){
    this.rotating = !this.rotating;
    if (this.rotating){
      this.rotationSpeed = this.rotationSpeedDefault;
    }
    else {
      this.rotationSpeed = 0;
    }
  }
}
