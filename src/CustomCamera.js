import * as THREE from 'three';

export class CustomCamera extends THREE.PerspectiveCamera {

    constructor(fov = 75, aspect = window.innerWidth / window.innerHeight, near = 0.1, far = 1000) {
        super(fov, aspect, near, far);
        
        // Position de base de la caméra
        this.position.set(22, 21, 45);
        const STARTING_DIRECTION = new THREE.Vector3(-0.75, -0.52, -0.40);

        this.setDirection( STARTING_DIRECTION );
    
    }

    setDirection(direction) {
        const lookAtTarget = new THREE.Vector3().addVectors(this.position, direction);
        this.lookAt(lookAtTarget);
    }

    getDirection() {
        const direction = new THREE.Vector3();
        this.getWorldDirection(direction);
        return direction;
    }

    // Déplacer la caméra dans sa direction actuelle
    moveForward(speed = this.moveSpeed) {
        const direction = this.getDirection();
        this.position.addScaledVector(direction, speed);
    }

}

