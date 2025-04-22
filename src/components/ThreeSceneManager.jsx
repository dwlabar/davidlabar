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
    z: settings.cubeSizeZ
  });
  const cubesRef = useRef([]);
  const waveTimeRef = useRef(0);
  const particleDistanceRef = useRef(0);
  const baseParticleSpeed = 0.45;
  const defaultSpeed = 0.3;

  useEffect(() => {
    speedRef.current = settings.speed;
  }, [settings.speed]);

  useEffect(() => {
    cubeScaleRef.current = {
      x: settings.cubeSizeX,
      y: settings.cubeSizeY,
      z: settings.cubeSizeZ
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

    const mount = mountRef.current;
    let newWidth = mount.clientWidth;
    let newHeight = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      newWidth / newHeight,
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
    renderer.setSize(newWidth, newHeight, false);
    renderer.setClearColor(0x151515);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(100, 250, 75);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0x3399ff, 8);
    backLight.position.set(0, 20, 180);
    backLight.target.position.set(0, 0, 0);
    scene.add(backLight);
    scene.add(backLight.target);

    // === Particle System ===
    const particleCount = 100;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleYOffset = new Float32Array(particleCount);
    const particleHeightMultiplier = new Float32Array(particleCount);
    const baseMargin = 1;
    const variation = 5;

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * (gridSpanZ / 2);
      particlePositions[i * 3 + 1] = Math.random(); // 0–1 multiplier
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * gridSpanZ;
      particleYOffset[i] = Math.random() * variation;
      particleHeightMultiplier[i] = particlePositions[i * 3 + 1];
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
          pos.z = mod(pos.z + uGridSpanZ/2.0, uGridSpanZ) - uGridSpanZ/2.0;

          float dist = distance(pos, uCameraPos);
          float opacity = 0.0;
          if (dist < uFadeEnd) {
            opacity = 1.0;
          } else if (dist < uFadeStart) {
            float t = (uFadeStart - dist)/(uFadeStart - uFadeEnd);
            opacity = pow(t, uFadeCurve);
          }
          vOpacity = opacity;

          gl_PointSize = 4.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying float vOpacity;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          float alpha = vOpacity * smoothstep(0.5, 0.0, dist);
          vec3 color = mix(vec3(1.0), vec3(0.4, 0.6, 1.0), dist);
          gl_FragColor = vec4(color, alpha);
        }
      `
    });

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlePoints);

    const gridSize = settings.gridSize;
    const centerMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const cubes = [];
    for (let x = -Math.floor(gridSize / 2); x <= Math.floor(gridSize / 2); x++) {
      for (let z = -Math.floor(gridSize / 2); z <= Math.floor(gridSize / 2); z++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = x === 0 && z === 0
          ? centerMaterial
          : new THREE.MeshPhongMaterial({
            color: 0x373737,
            transparent: true,
            opacity: 0,
            specular: 0x555555,
            shininess: 100
          });

        const cube = new THREE.Mesh(geometry, material);
        cube.scale.set(
          cubeScaleRef.current.x,
          cubeScaleRef.current.y,
          cubeScaleRef.current.z
        );

        const posX = x * stepX;
        const posZ = z * stepZ;
        let posY = 0;
        if (settings.waveEffectEnabled) {
          posY = settings.waveAmplitude * Math.sin(
            posX * settings.waveFrequency + posZ * settings.waveFrequency
          );
        } else if (settings.randomYEffectEnabled) {
          const range = settings.randomYRange || 10;
          posY = (Math.random() - 0.5) * range;
        }
        cube.position.set(posX, posY, posZ);
        cube.userData.phase = posX * settings.waveFrequency + posZ * settings.waveFrequency;
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

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (settings.waveEffectEnabled) {
        waveTimeRef.current += settings.waveSpeed;
      }

      particleDistanceRef.current += baseParticleSpeed * (speedRef.current / defaultSpeed);
      particleMaterial.uniforms.uDistanceTraveled.value = particleDistanceRef.current;

      const baseY = cubeScaleRef.current.y / 2 + baseMargin;
      for (let i = 0; i < particleCount; i++) {
        const heightScale = particleHeightMultiplier[i];
        particlePositions[i * 3 + 1] = baseY + heightScale * 20 + particleYOffset[i];
      }
      particleGeometry.attributes.position.needsUpdate = true;

      cubes.forEach(cube => {
        cube.position.z += speedRef.current;

        if (settings.waveEffectEnabled) {
          cube.position.y = settings.waveAmplitude *
            Math.sin(cube.userData.phase + waveTimeRef.current);
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
          } else if (settings.waveEffectEnabled) {
            cube.position.y = settings.waveAmplitude *
              Math.sin(cube.userData.phase + waveTimeRef.current);
          }
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    let resizeTimeout;
    const handleResize = () => {
      newWidth = mount.clientWidth;
      newHeight = mount.clientHeight;
      renderer.setSize(newWidth, newHeight, false);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      particleMaterial.uniforms.uCameraPos.value.copy(camera.position);
    };
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    });
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);

      scene.traverse(object => {
        if (!object.isMesh) return;
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach(mat => mat.dispose());
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
