import { Mesh } from 'three';

export class MagicBall {

  public mainMesh: Mesh;
  public rotationSpeed: number;

  constructor (mesh: Mesh) {
    this.mainMesh = mesh;
    this.rotationSpeed = Math.random() * 3;
  }

  animate() {
    this.mainMesh.rotateY(this.rotationSpeed);
  }
}
