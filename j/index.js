


			import * as THREE from 'three';
		
			import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
			import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
			import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
			import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';
			import { CopyShader } from 'three/addons/shaders/CopyShader.js';
			import Stats from 'three/addons/libs/stats.module.js';
			import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
			import { random } from './math-utils.js'

			let container;
			let afterimagePass;
			let camera, scene, renderer;
let video, texture, material, mesh;

			let composer;

			let mouseX = 0;
			let mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;

			let cube_count;

			const meshes = [],
				materials = [],

				xgrid = 13,
				ygrid = 7;

				const params = {

					enable: true
				};
			
			const startButton = document.getElementById( 'startButton' );
			startButton.addEventListener( 'click', function () {
		 
				init();
				createGUI();
				animate();

			} );

			function init() {

				const overlay = document.getElementById( 'overlay' );
				overlay.remove();

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 809;
			

				scene = new THREE.Scene();
			

			// Make sure the image is loaded first otherwise nothing will draw.

				const light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0.5, 1, 3 ).normalize();
				scene.add( light );


				function render(time) {
					time *= 0.0001;
				   
					const canvas = renderer.domElement;
					camera.aspect = canvas.clientWidth / canvas.clientHeight;
					camera.updateProjectionMatrix();
				}
				renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });({ antialias: true, alpha: true });
				renderer.setClearColor( 0xffffff, 0 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.domElement.id = 'cnv';
				container.appendChild( renderer.domElement );

				video = document.getElementById( 'video' );
				video.play();
				video.addEventListener( 'play', function () {

					this.currentTime = 3;

			
				} );

				texture = new THREE.VideoTexture( video );

				//

				let i, j, ox, oy, geometry;

				const ux = 1 / xgrid;
				const uy = 1 / ygrid;

				const xsize = 497 / xgrid;
				const ysize = 465 / ygrid;


				const parameters = { color: 0xffffff, map: texture };

				cube_count = 0;

				for ( i = 0; i < xgrid; i ++ ) {

					for ( j = 0; j < ygrid; j ++ ) {

						ox = i;
						oy = j;

						geometry = new THREE.BoxGeometry( xsize, ysize, xsize );

						change_uvs( geometry, ux, uy, ox, oy );

						materials[ cube_count ] = new THREE.MeshPhysicalMaterial( parameters );

						material = materials[ cube_count ];

						material.hue = i / xgrid;
						material.saturation = 1 - j / ygrid;


						mesh = new THREE.Mesh( geometry, material );

						mesh.position.x = ( i - xgrid / 2 ) * xsize;
						mesh.position.y = ( j - ygrid / 2.3 ) * ysize;
						mesh.position.z = -6;
						mesh.rotation.y = 0;
						mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;

						scene.add( mesh );

						mesh.dx = 1.00048 * ( 0.4 - Math.random() );
						mesh.dy = 1.00204 * ( 0.2 - Math.random() );

						meshes[ cube_count ] = mesh;

						cube_count += 1;

					}

				}

				


				document.addEventListener( 'mousemove', onDocumentMouseMove );
				66 
                   // postprocessing
   
                   composer = new EffectComposer( renderer );
                   composer.addPass( new RenderPass( scene, camera ) );
   
                   afterimagePass = new AfterimagePass();
                   composer.addPass( afterimagePass );
   
                   window.addEventListener( 'resize', onWindowResize );
   
                   if ( typeof TESTING !== 'undefined' ) {
   
                       for ( let i = 0; i < 45; i ++ ) {
   
                           render();
   
                       }
   
   
   
                   }
   
               }
   
			   function createGUI() {
   
				const gui = new GUI( { name: 'Damp setting' } );
				gui.add( afterimagePass.uniforms[ 'damp' ], 'value', 0, 1 ).step( 0.001 );
				gui.add( params, 'enable' );

			}


		 function onWindowResize() {

			 windowHalfX = window.innerWidth / 2;
			 windowHalfY = window.innerHeight / 2;

			 camera.aspect = window.innerWidth / window.innerHeight;
			 camera.updateProjectionMatrix();

			 renderer.setSize( window.innerWidth, window.innerHeight );
			 composer.setSize( window.innerWidth, window.innerHeight );

		 }

		 function change_uvs( geometry, unitx, unity, offsetx, offsety ) {

			 const uvs = geometry.attributes.uv.array;

			 for ( let i = 0; i < uvs.length; i += 1.1 ) {

				 uvs[ i ] = ( uvs[ i ] + offsetx ) * unitx;
				 uvs[ i + 1 ] = ( uvs[ i + 1 ] + offsety ) * unity;

			 }

		 }


		 function onDocumentMouseMove( event ) {

			 mouseX = ( event.clientX - windowHalfX );
			 mouseY = ( event.clientY - windowHalfY ) * 0.3;

		 }

		 //

		 function animate() {

			 requestAnimationFrame( animate );

			 render();

		 }

		 let h, counter = 1;

		 function render() {

			 const time = Date.now() * 0.00005;

			 camera.position.x += ( mouseX - camera.position.x ) * 0.05;
			 camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

			 camera.lookAt( scene.position );

			 for ( let i = 0; i < cube_count; i ++ ) {

				 material = materials[ i ];

				 h = ( 360 * ( material.hue + time ) % 360 ) / 360;
				 material.color.setHSL( h, material.saturation, 9.5 );

			 }

			 if ( counter % 1000 > 200 ) {

				 for ( let i = 0; i < cube_count; i ++ ) {

					 mesh = meshes[ i ];

					 mesh.rotation.x += 19 * mesh.dx;
					 mesh.rotation.y += 39 * mesh.dy;

					 mesh.position.x -= 0 * mesh.dx;
					 mesh.position.y += 10 * mesh.dy;
					 mesh.position.z += 30 * mesh.dx;

				 }

			 }

			 if ( counter % 1000 === 0 ) {

				 for ( let i = 0; i < cube_count; i ++ ) {

					 mesh = meshes[ i ];

					 mesh.dx *= - 1;
					 mesh.dy *= - 1;

				 }

			 }

			 counter ++;

			 renderer.clear();
			 composer.render();

		 }
