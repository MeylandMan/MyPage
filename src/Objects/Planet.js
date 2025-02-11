import * as THREE from 'three';
import { Object3D } from 'three/webgpu';

export class Planet extends Object3D {

    constructor(ID, Texture) {
        
        super();

        this.ID = ID;
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(),
            new THREE.MeshBasicMaterial( { map: Texture } )
        )
    }
}