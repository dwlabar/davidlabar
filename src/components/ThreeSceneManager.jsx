import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeSceneContext } from '../context/ThreeSceneContext';

const ThreeSceneManager = () => {

  // ======= REFS AND CONTEXT =======

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
  const baseParticleSpeed = 0.45;
  const defaultSpeed = 0.3;

  // ======= EFFECT: SPEED REF UPDATE =======

  useEffect(() => {
    speedRef.current = settings.speed;
  }, [settings.speed]);

  // ======= EFFECT: CUBE SCALE UPDATE =======

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

  // ======= MAIN THREE.JS SETUP =======

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let newWidth = mount.clientWidth;
    let newHeight = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, newWidth / newHeight, 0.1, 1000);

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

    // ======= LIGHTING =======

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.25);
    directionalLight.position.set(1, 1, 0);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0x3399ff, 8);
    backLight.position.set(0, 30, 180);
    scene.add(backLight);

    // ======= PARTICLE SYSTEM =======

    const trailCount = 10;
    const trails = [];
    const depth = gridSpanZ;
    const baseMargin = 1;

    for (let i = 0; i < trailCount; i++) {
      const geom = new THREE.PlaneGeometry(0.1, 1);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x0286eb,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const trail = new THREE.Mesh(geom, mat);
      trail.rotation.x = Math.PI / 2;
      resetTrail(trail, true);
      scene.add(trail);
      trails.push(trail);
    }

    function resetTrail(trail, init = false) {
      trail.position.x = (Math.random() - 0.5) * (gridSpanZ / 2);
      trail.position.y = cubeScaleRef.current.y + baseMargin + 5 + Math.random() * 30; // increased Y spread
      trail.position.z = init ? -Math.random() * depth : -depth;
    }

    // ======= CUBE GRID GENERATION =======

    const fadeStart = settings.fadeStart || 60;
    const fadeEnd = settings.fadeEnd || 10;
    const fadeCurve = settings.fadeCurve || 2;

    const gridSize = settings.gridSize;
    const cubes = [];
    for (let x = -Math.floor(gridSize / 2); x <= Math.floor(gridSize / 2); x++) {
      for (let z = -Math.floor(gridSize / 2); z <= Math.floor(gridSize / 2); z++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({
          color: 0x373737,
          transparent: true,
          opacity: 0,
          specular: 0xffffff,
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

    // ======= ANIMATION LOOP =======

    const calculateOpacity = (objPos) => {
      const distance = camera.position.distanceTo(objPos);
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

      trails.forEach(trail => {
        const speed = baseParticleSpeed * (speedRef.current / defaultSpeed);
        trail.position.z += speed;
        trail.scale.y = 0.75 + speed * 5;

        const fade = calculateOpacity(trail.position);
        trail.material.opacity = fade * 0.8;

        if (trail.position.z > camera.position.z + 10) {
          resetTrail(trail);
        }
      });

      cubes.forEach(cube => {
        cube.position.z += speedRef.current;

        if (settings.waveEffectEnabled) {
          cube.position.y = settings.waveAmplitude *
            Math.sin(cube.userData.phase + waveTimeRef.current);
        }

        if (cube.material.transparent) {
          const opacity = calculateOpacity(cube.position);
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

    // ======= HANDLE RESIZE =======

    let resizeTimeout;
    const handleResize = () => {
      newWidth = mount.clientWidth;
      newHeight = mount.clientHeight;
      renderer.setSize(newWidth, newHeight, false);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    });
    resizeObserver.observe(mount);

    // ======= CLEANUP =======

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
