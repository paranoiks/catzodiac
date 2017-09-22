import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { MagicBall } from './magicball.model';
import {
  Mesh, MeshBasicMaterial, MeshLambertMaterial, Texture,
  TextureLoader
} from 'three';
import { current } from "codelyzer/util/syntaxKind";

@Component( {
  selector : 'app-root',
  templateUrl : './app.component.html',
  styleUrls : [ './app.component.css' ]
} )
export class AppComponent {

  title = 'app works!';

  public scene : any;
  public camera : any;
  public material : any;

  public magicBalls : MagicBall[] = [];
  @ViewChild( 'rendererContainer' ) rendererContainer : ElementRef;

  public renderer : any = new THREE.WebGLRenderer();

  public textureLoader : TextureLoader;

  public catMaterials : MeshBasicMaterial[] = [];

  public magicBallList : { [key : string] : MagicBall; } = {};

  public magicBallsObjects = [];


  constructor() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();

    this.textureLoader = new TextureLoader();
    let texturesLoaded = 0;
    for ( let i = 1; i < 5; i++ ) {
      this.textureLoader.load(
        '../assets/img/cat' + i + '.jpg',
        ( texture ) => {
          this.catMaterials.push( new MeshBasicMaterial( { map : texture } ) );
          texturesLoaded++;
          if ( texturesLoaded === 4 ) {
            this.createSpheres();
          }
        } );
    }
    document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
  }


  onDocumentMouseDown = ( e ) => {

    console.log( this.renderer );
    e.preventDefault();

    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = ( e.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = -( e.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, this.camera );

    console.log(this.magicBallsObjects.length);
    let intersects = raycaster.intersectObjects( this.magicBallsObjects );

    console.log(intersects.length);
    if ( intersects.length > 0 ) {
      let clickedMagicBall = this.magicBallList[intersects[0].object.uuid];
      console.log( clickedMagicBall );
    }
  };

  createSpheres() {
    const geometry = new THREE.SphereGeometry( 50, 15, 15 );

    const bigSphereRadius = 500;
    let currentMesh : Mesh = null;

    let rad : number;
    let x : number;
    let y : number;

    for ( let n = 1; n <= 12; n++ ) {
      currentMesh = new THREE.Mesh(
        geometry,
        this.catMaterials[ Math.floor( Math.random() * 3 ) ]
      );

      rad = n * 30 * (Math.PI / 180);

      x = Math.cos( rad ) * bigSphereRadius;
      y = Math.sin( rad ) * bigSphereRadius;

      currentMesh.position.set( Math.cos( rad ) * bigSphereRadius, Math.sin( rad ) * bigSphereRadius, 200 );

      this.scene.add( currentMesh );

      this.magicBallsObjects.push(currentMesh);
      this.magicBalls.push( new MagicBall( currentMesh ) );
      this.magicBallList[ currentMesh.uuid ] = this.magicBalls[ this.magicBalls.length - 1 ];
    }
  }

  ngAfterViewInit() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );
    this.animate();
  }

  animate() {
    window.requestAnimationFrame( () => this.animate() );

    this.renderer.render( this.scene, this.camera );

    for ( let i = 0; i < this.magicBalls.length; i++ ) {
      this.magicBalls[ i ].animate();
    }
  }
}
