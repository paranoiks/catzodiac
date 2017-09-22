import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { MagicBall } from './magicball.model';
import { Mesh, Texture, TextureLoader } from 'three';

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


  constructor() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 1000;
    this.scene = new THREE.Scene();

    this.material = new THREE.MeshBasicMaterial(0x00ff00);
    //this.material = new THREE.MeshLambertMaterial(texture);

    this.createSpheres();

    this.textureLoader = new TextureLoader();

    this.textureLoader.load(
      '../assets/img/cat1.jpeg',
      (texture) =>  {


      });
    }

    createSpheres(){
      const geometry = new THREE.SphereGeometry( 50, 15, 15 );

      const bigSphereRadius = 500;
      let currentMesh : Mesh = null;

      let rad : number;
      let x : number;
      let y : number;

      for ( let n = 1; n <= 12; n++ ) {
        currentMesh = new THREE.Mesh( geometry, this.material );

        rad = n * 30 * (Math.PI / 180);

        x = Math.cos( rad ) * bigSphereRadius;
        y = Math.sin( rad ) * bigSphereRadius;

        currentMesh.position.set( Math.cos( rad ) * bigSphereRadius, Math.sin( rad ) * bigSphereRadius, 200 );

        this.scene.add( currentMesh );

        this.magicBalls.push( new MagicBall( currentMesh ) );
      }
    }

    ngAfterViewInit()
    {
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );
      this.animate();
    }

    animate()
    {
      window.requestAnimationFrame( () => this.animate() );

      this.renderer.render( this.scene, this.camera );

      for ( let i = 0; i < this.magicBalls.length; i++ ) {
        this.magicBalls[ i ].animate();
      }
    }
  }
