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

    // Shader-based particle system
    const particleCount = 500;
    const particlePositions = new Float32Array(particleCount * 3);
    const startTimes = new Float32Array(particleCount);
    const lifetimes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 80;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 60 + 20;
      particlePositions[i * 3 + 2] = -Math.random() * 200;
      startTimes[i] = Math.random() * 10;
      lifetimes[i] = 8 + Math.random() * 4;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('startTime', new THREE.BufferAttribute(startTimes, 1));
    particleGeometry.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 }
      },
      vertexShader: `
        precision mediump float;
        attribute float startTime;
        attribute float lifetime;
        uniform float uTime;
        varying float vLifetime;
        void main() {
          float age = mod(uTime - startTime, lifetime);
          vLifetime = age / lifetime;
          vec3 pos = position;
          pos.x += sin(age * 1.5) * 2.0;
          pos.y += cos(age * 1.0) * 1.5;
          pos.z += age * 4.0;
          gl_PointSize = 3.0 + 3.0 * (1.0 - vLifetime);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying float vLifetime;
        void main() {
          float fade = smoothstep(0.0, 0.1, vLifetime) * (1.0 - vLifetime);
          gl_FragColor = vec4(1.0, 1.0, 1.0, fade);
        }
      `
    });

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlePoints);

    // Cube grid setup
    const gridSize = settings.gridSize;
    const fadeStart = settings.fadeStart || 60;
    const fadeEnd = settings.fadeEnd || 10;
    const fadeCurve = settings.fadeCurve || 2;

    const getResetZPosition = (currentZ) => currentZ - gridSpanZ;

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

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      particleMaterial.uniforms.uTime.value = elapsed;

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
