import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeSceneContext } from '../context/ThreeSceneContext';

const ThreeSceneManager = () => {
  const mountRef = useRef(null);
  const { settings } = useThreeSceneContext();

  const speedRef = useRef(settings.speed);
  const cubeScaleRef = useRef({
    x: settings.cubeSizeX,
    y: settings.cubeSizeY,
    z: settings.cubeSizeZ,
  });
  const cubesRef = useRef([]);
  const distanceTraveledRef = useRef(0);

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
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const cubeSpacing = settings.cubeSpacing;
    const stepZ = cubeScaleRef.current.z + cubeSpacing;
    const stepX = cubeScaleRef.current.x + cubeSpacing;
    const gridSpanZ = (settings.gridSize + 1) * stepZ;
    const startZ = gridSpanZ / 2;

    camera.position.set(0, 40, 40);
    camera.lookAt(0, 0, -((settings.gridSize / 2 - 1) * stepZ));

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x151515);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 100, 75);
    scene.add(directionalLight);

    // Particle system setup
    const particleCount = 100;
    const particlePositions = new Float32Array(particleCount * 3);
    // Array to store random offsets for y position
    const particleYOffset = new Float32Array(particleCount);
    const baseMargin = 1; // margin above the cube top
    const variation = 5; // range for random y variation above the cube
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * (gridSpanZ / 2);
      // Set a placeholder for y; it will be updated dynamically in the animate loop
      particlePositions[i * 3 + 1] = 0;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * gridSpanZ;
      particleYOffset[i] = Math.random() * variation;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const fadeStart = settings.fadeStart || 60;
    const fadeEnd = settings.fadeEnd || 10;
    const fadeCurve = settings.fadeCurve || 2;

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uDistanceTraveled: { value: 0 },
        uGridSpanZ: { value: gridSpanZ },
        uCameraPos: { value: camera.position.clone() },
        uFadeStart: { value: fadeStart },
        uFadeEnd: { value: fadeEnd },
        uFadeCurve: { value: fadeCurve }
      },
      vertexShader: `
        precision mediump float;
        uniform float uDistanceTraveled;
        uniform float uGridSpanZ;
        uniform vec3 uCameraPos;
        uniform float uFadeStart;
        uniform float uFadeEnd;
        uniform float uFadeCurve;
        varying float vOpacity;
        void main() {
          vec3 pos = position;
          pos.z += uDistanceTraveled;
          pos.z = mod(pos.z + uGridSpanZ / 2.0, uGridSpanZ) - uGridSpanZ / 2.0;

          float dist = distance(pos, uCameraPos);
          float opacity = 0.0;
          if (dist < uFadeEnd) {
            opacity = 1.0;
          } else if (dist < uFadeStart) {
            float t = (uFadeStart - dist) / (uFadeStart - uFadeEnd);
            opacity = pow(t, uFadeCurve);
          }
          vOpacity = opacity;

          gl_PointSize = 4.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
        }
      `
    });

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlePoints);

    const gridSize = settings.gridSize;
    const centerMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cubes = [];

    for (let x = -Math.floor(gridSize / 2); x <= Math.floor(gridSize / 2); x++) {
      for (let z = -Math.floor(gridSize / 2); z <= Math.floor(gridSize / 2); z++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material =
          x === 0 && z === 0
            ? centerMaterial
            : new THREE.MeshPhongMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0
            });

        const cube = new THREE.Mesh(geometry, material);
        cube.scale.set(
          cubeScaleRef.current.x,
          cubeScaleRef.current.y,
          cubeScaleRef.current.z
        );

        const posX = x * stepX;
        const posZ = z * stepZ;
        cube.position.set(posX, 0, posZ);
        scene.add(cube);
        cubes.push(cube);
      }
    }

    cubesRef.current = cubes;

    const calculateOpacity = (cube) => {
      const distance = camera.position.distanceTo(cube.position);
      if (distance > fadeStart) return 0;
      if (distance < fadeEnd) return 1;
      const t = (fadeStart - distance) / (fadeStart - fadeEnd);
      return Math.pow(t, fadeCurve);
    };

    const getResetZPosition = (currentZ) => currentZ - gridSpanZ;

    const animate = () => {
      requestAnimationFrame(animate);

      distanceTraveledRef.current += speedRef.current;
      particleMaterial.uniforms.uDistanceTraveled.value = distanceTraveledRef.current;

      // Update particle y positions so they always stay above the cubes
      const baseY = cubeScaleRef.current.y / 2 + baseMargin;
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3 + 1] = baseY + particleYOffset[i];
      }
      particleGeometry.attributes.position.needsUpdate = true;

      cubes.forEach((cube) => {
        cube.position.z += speedRef.current;
        if (cube.material.transparent) {
          const opacity = calculateOpacity(cube);
          if (cube.material.opacity !== opacity) {
            cube.material.opacity = opacity;
            cube.material.needsUpdate = true;
          }
        }
        if (cube.position.z > startZ) {
          cube.position.z = getResetZPosition(cube.position.z);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      particleMaterial.uniforms.uCameraPos.value.copy(camera.position);
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
