import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeSceneContext } from '../context/ThreeSceneContext';

// === Main Three.js Scene Manager Component ===
const ThreeSceneManager = () => {
  // === References & Config ===
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
  const particleDistanceRef = useRef(0);
  const baseParticleSpeed = 0.45; // Particles move faster than cubes by default
  const defaultSpeed = 0.3; // Reference speed for scaling particle movement

  // === Update speed ref on slider changes ===
  useEffect(() => {
    speedRef.current = settings.speed;
  }, [settings.speed]);

  // === Update cube scale when settings change ===
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

  // === Scene Setup ===
  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // === Create scene, camera, and renderer ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
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
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x151515);
    mount.appendChild(renderer.domElement);

    // === Lighting ===
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 100, 75);
    scene.add(directionalLight);

    // === Particle System ===
    const particleCount = 100;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleYOffset = new Float32Array(particleCount);
    const baseMargin = 1;
    const variation = 5;
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * (gridSpanZ / 2);
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

          gl_PointSize = 1.5;
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

    // === Grid of Cubes ===
    const gridSize = settings.gridSize;
    const centerMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cubes = [];

    for (let x = -Math.floor(gridSize / 2); x <= Math.floor(gridSize / 2); x++) {
      for (let z = -Math.floor(gridSize / 2); z <= Math.floor(gridSize / 2); z++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = x === 0 && z === 0 ? centerMaterial : new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0 });

        const cube = new THREE.Mesh(geometry, material);
        cube.scale.set(
          cubeScaleRef.current.x,
          cubeScaleRef.current.y,
          cubeScaleRef.current.z
        );

        const posX = x * stepX;
        const posZ = z * stepZ;
        let posY = 0;
        if (settings.randomYEffectEnabled && !settings.waveEffectEnabled) {
          const range = settings.randomYRange || 10;
          posY = (Math.random() - 0.5) * range;
        }
        cube.position.set(posX, posY, posZ);
        scene.add(cube);
        cubes.push(cube);
      }
    }
    cubesRef.current = cubes;

    // === Utility Functions ===
    const calculateOpacity = (cube) => {
      const distance = camera.position.distanceTo(cube.position);
      if (distance > fadeStart) return 0;
      if (distance < fadeEnd) return 1;
      const t = (fadeStart - distance) / (fadeStart - fadeEnd);
      return Math.pow(t, fadeCurve);
    };

    const getResetZPosition = (currentZ) => currentZ - gridSpanZ;

    // === Animation Loop ===
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Update distances
      distanceTraveledRef.current += speedRef.current;
      particleDistanceRef.current += baseParticleSpeed * (speedRef.current / defaultSpeed);
      particleMaterial.uniforms.uDistanceTraveled.value = particleDistanceRef.current;

      // Animate particles
      const baseY = cubeScaleRef.current.y / 2 + baseMargin;
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3 + 1] = baseY + particleYOffset[i];
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Animate cubes
      cubes.forEach((cube) => {
        cube.position.z += speedRef.current;

        if (settings.waveEffectEnabled) {
          const amplitude = settings.waveAmplitude || 5;
          const frequency = settings.waveFrequency || 0.2;
          const waveSpeed = settings.waveSpeed || 0.1;
          cube.position.y = amplitude * Math.sin(cube.position.x * frequency + distanceTraveledRef.current * waveSpeed);
        }

        if (cube.material.transparent) {
          const opacity = calculateOpacity(cube);
          if (cube.material.opacity !== opacity) {
            cube.material.opacity = opacity;
            cube.material.needsUpdate = true;
          }
        }

        if (cube.position.z > startZ) {
          cube.material.opacity = 0;
          cube.material.needsUpdate = true;
          cube.position.z = getResetZPosition(cube.position.z);
          if (settings.randomYEffectEnabled && !settings.waveEffectEnabled) {
            const range = settings.randomYRange || 10;
            cube.position.y = (Math.random() - 0.5) * range;
          }
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // === Resize Observer ===
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        renderer.setSize(newWidth, newHeight, false);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        particleMaterial.uniforms.uCameraPos.value.copy(camera.position);
      }
    });
    resizeObserver.observe(mount);

    // === Cleanup ===
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();

      scene.traverse((object) => {
        if (!object.isMesh) return;
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach(disposeMaterialAndTextures);
        object.geometry.dispose();
      });

      renderer.dispose();
      if (renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="three-scene" />;
};

export default ThreeSceneManager;

// === Properly dispose materials and textures to prevent memory leaks ===
function disposeMaterialAndTextures(material) {
  material.dispose();
  const textureProps = [
    'map', 'lightMap', 'bumpMap', 'normalMap', 'specularMap',
    'envMap', 'alphaMap', 'aoMap', 'displacementMap', 'emissiveMap',
    'metalnessMap', 'roughnessMap'
  ];

  textureProps.forEach(prop => {
    const tex = material[prop];
    if (tex) tex.dispose();
  });
}