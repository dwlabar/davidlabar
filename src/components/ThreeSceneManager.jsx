import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useSceneContext } from '../context/ThreeSceneContext';

const ThreeSceneManager = () => {
  const mountRef = useRef(null);
  const { settings } = useSceneContext();

  const speedRef = useRef(settings.speed);
  const cubeScaleRef = useRef({ x: settings.cubeSizeX, y: settings.cubeSizeY, z: settings.cubeSizeZ });
  const cubesRef = useRef([]);

  useEffect(() => {
    speedRef.current = settings.speed;
  }, [settings.speed]);

  useEffect(() => {
    cubeScaleRef.current = {
      x: settings.cubeSizeX,
      y: settings.cubeSizeY,
      z: settings.cubeSizeZ,
    };
    cubesRef.current.forEach(cube => {
      cube.scale.set(
        cubeScaleRef.current.x,
        cubeScaleRef.current.y,
        cubeScaleRef.current.z
      );
    });
  }, [settings.cubeSizeX, settings.cubeSizeY, settings.cubeSizeZ]);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 40);
    camera.lookAt(0, 0, -((settings.gridSize / 2 - 1) * (cubeScaleRef.current.z + settings.cubeSpacing)));

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 100, 75);
    scene.add(directionalLight);

    const gridSize = settings.gridSize;
    const cubeSpacing = settings.cubeSpacing;
    const totalDepth = (cubeScaleRef.current.z + cubeSpacing) * gridSize;
    const resetZ = -totalDepth / 2;
    const startZ = totalDepth / 2;
    const fadeInRadius = 220;
    const falloffDistance = 40;

    const centerMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cubes = [];

    for (let x = -Math.floor(gridSize / 2); x <= Math.floor(gridSize / 2); x++) {
      for (let z = -Math.floor(gridSize / 2); z <= Math.floor(gridSize / 2); z++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material =
          x === 0 && z === 0
            ? centerMaterial
            : new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
        const cube = new THREE.Mesh(geometry, material);

        cube.scale.set(
          cubeScaleRef.current.x,
          cubeScaleRef.current.y,
          cubeScaleRef.current.z
        );

        cube.position.set(
          x * (cubeScaleRef.current.x + cubeSpacing),
          0,
          z * (cubeScaleRef.current.z + cubeSpacing)
        );

        scene.add(cube);
        cubes.push(cube);
      }
    }

    cubesRef.current = cubes;

    const calculateOpacity = (cubePosition) => {
      const distanceToCamera = camera.position.distanceTo(cubePosition);
      if (distanceToCamera > fadeInRadius) return 0;
      return Math.min(1, (fadeInRadius - distanceToCamera) / falloffDistance);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach((cube) => {
        cube.position.z += speedRef.current;
        if (cube.material.transparent) {
          cube.material.opacity = calculateOpacity(cube.position);
        }
        if (cube.position.z > startZ) {
          cube.position.z = resetZ;
          if (cube.material.transparent) cube.material.opacity = 0;
        }
      });
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return <div ref={mountRef} className="three-scene" />;
};

export default ThreeSceneManager;
