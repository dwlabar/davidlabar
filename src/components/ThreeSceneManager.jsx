// Last updated: 3.4.0

import { useContext, useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { PreloaderContext } from '../context/PreloaderContext';
import { useThreeSceneContext } from '../context/ThreeSceneContext';
import useReducedMotion from '../hooks/useReducedMotion';

// Entrance tuning: seconds, world units, and angular frequency (radians/second).
const IMPACT_RIPPLE = {
  originX: 0,
  originZ: -20,
  // Gravity-equivalent fall; velocity / spring frequency sets penetration strength.
  dropHeight: 6,
  dropDuration: 0.5,
  reboundFrequency: 10, // Gives about 1.5 world units of penetration at this drop velocity.
  reboundDamping: 3.2,
  reboundDuration: 1.4,
  // Cell-relative amplitude stays independent of the user's cube-height setting.
  waveSpeed: 80,
  waveAmplitudeCells: 0.7,
  waveWavelengthCells: 6, // Each crest/trough spans three radial grid cells.
  waveCycles: 1.5, // One crest, one trough, then a weaker recovery.
  waveTemporalDamping: 1.5,
  waveRadialAttenuation: 0.0012,
  arrivalWidthCells: 0.8,
  revealWidthCells: 1.5,
  // The nearest cells depress first; smoothly transition into the outgoing crest.
  centerRadiusCells: 2,
  centerDepressionCells: 0.16,
  // Finite smooth tails guarantee exact rest rather than an exponential remnant.
  settleFadeDuration: 0.25
};
// Derived spring strength preserves the fall's crossing velocity when tuning.
// Damping reduces the actual penetration below this undamped amplitude.
const IMPACT_VELOCITY = -2 * IMPACT_RIPPLE.dropHeight / IMPACT_RIPPLE.dropDuration;
const IMPACT_PENETRATION = -IMPACT_VELOCITY / IMPACT_RIPPLE.reboundFrequency;

const ThreeSceneManager = () => {
  // ======= REFS AND CONTEXT =======

  const mountRef = useRef(null);
  const renderSceneRef = useRef(null);
  const sceneEntranceRef = useRef(null);
  const { isPreloaderVisible } = useContext(PreloaderContext);
  const preloaderVisibleRef = useRef(isPreloaderVisible);
  const { settings } = useThreeSceneContext();
  const prefersReducedMotion = useReducedMotion();

  const cellSize = 10; // Fixed size of each grid cell

  const speedRef = useRef(settings.speed);
  const cubeScaleRef = useRef({
    x: settings.cubeSizeX,
    y: settings.cubeSizeY,
    z: settings.cubeSizeZ
  });

  // GSAP animation targets
  const speedTarget = useRef({ value: settings.speed });
  const scaleTarget = useRef({ ...cubeScaleRef.current });

  const cubesRef = useRef([]);
  const waveTimeRef = useRef(0);
  const baseParticleSpeed = 0.45;
  const defaultSpeed = 0.3;

  // ======= OUTLINE: global on/off value (0-1) ===========================
  const outlineToggleRef = useRef({ value: 0 });

  useEffect(() => {
    preloaderVisibleRef.current = isPreloaderVisible;
  }, [isPreloaderVisible]);

  // ======= EFFECT: SPEED UPDATE (with GSAP tween cleanup) =======
  useEffect(() => {
    if (prefersReducedMotion) {
      speedTarget.current.value = settings.speed;
      renderSceneRef.current?.();
      return;
    }

    const tween = gsap.to(speedTarget.current, {
      value: settings.speed,
      duration: 0.6,
      ease: 'power2.out'
    });
    return () => tween.kill();
  }, [prefersReducedMotion, settings.speed]);

  // ======= EFFECT: CUBE SCALE UPDATE (with GSAP tween cleanup) =======
  useEffect(() => {
    if (prefersReducedMotion) {
      scaleTarget.current.x = settings.cubeSizeX;
      scaleTarget.current.y = settings.cubeSizeY;
      scaleTarget.current.z = settings.cubeSizeZ;
      renderSceneRef.current?.();
      return;
    }

    const tween = gsap.to(scaleTarget.current, {
      x: settings.cubeSizeX,
      y: settings.cubeSizeY,
      z: settings.cubeSizeZ,
      duration: 0.6,
      ease: 'power2.out'
    });
    return () => tween.kill();
  }, [prefersReducedMotion, settings.cubeSizeX, settings.cubeSizeY, settings.cubeSizeZ]);

  // ======= OUTLINE EFFECT: sliders max => fade outlines on/off ==========
  useEffect(() => {
    const maxed =
      settings.cubeSizeX >= cellSize && settings.cubeSizeZ >= cellSize;

    if (prefersReducedMotion) {
      outlineToggleRef.current.value = maxed ? 1 : 0;
      renderSceneRef.current?.();
      return;
    }

    const tween = gsap.to(outlineToggleRef.current, {
      value: maxed ? 1 : 0,
      duration: 0.6,
      ease: 'power2.out'
    });
    return () => tween.kill();
  }, [prefersReducedMotion, settings.cubeSizeX, settings.cubeSizeZ]);

  // ======= MAIN THREE.JS SETUP =======
  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const newWidth = mount.clientWidth;
    const newHeight = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, newWidth / newHeight, 0.1, 1000);

    const stepX = cellSize;
    const stepZ = cellSize;
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
    const trailCount = 15;
    const trails = [];
    const depth = gridSpanZ;
    const baseMargin = 1;
    const trailResetZ = camera.position.z + 10;
    const trailTravelDistance = trailResetZ + depth;

    for (let i = 0; i < trailCount; i++) {
      const geom = new THREE.PlaneGeometry(0.1, 1);
      // Anchor the trail geometry at its leading edge so Y scaling stretches
      // backward into the scene while the mesh continues moving toward camera.
      geom.translate(0, -0.5, 0);
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
      resetTrail(trail, i);
      scene.add(trail);
      trails.push(trail);
    }

    function resetTrail(trail, initialIndex = null, overshoot = 0) {
      trail.position.x = (Math.random() - 0.5) * (gridSpanZ / 2);
      trail.position.y = cubeScaleRef.current.y + baseMargin + 5 + Math.random() * 30;

      if (initialIndex !== null) {
        const spacing = trailTravelDistance / trailCount;
        trail.position.z = -depth + initialIndex * spacing;
        return;
      }

      trail.position.z = -depth + overshoot;
    }

    // ======= SCENE ENTRANCE STATE =======
    // Production grid travel continues independently of the entrance state.
    // The authored impact begins only after the preloader fully releases.
    const shouldAnimateEntrance =
      !prefersReducedMotion && preloaderVisibleRef.current;
    const entranceState = {
      elapsed: 0,
      startedAt: 0,
      settleAt: 0
    };
    let entranceStarted = !shouldAnimateEntrance;
    let entranceComplete = !shouldAnimateEntrance;

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
          shininess: 100,
          emissive: 0x0286eb,
          emissiveIntensity: 0
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.scale.set(settings.cubeSizeX, settings.cubeSizeY, settings.cubeSizeZ);

        const posX = x * stepX;
        const posZ = z * stepZ;
        let posY = 0;

        if (settings.waveEffectEnabled) {
          posY = settings.waveAmplitude * Math.sin(posX * settings.waveFrequency + posZ * settings.waveFrequency);
        } else if (settings.randomYEffectEnabled) {
          const range = settings.randomYRange || 10;
          posY = (Math.random() - 0.5) * range;
        }

        cube.position.set(posX, posY, posZ);
        cube.userData.phase = posX * settings.waveFrequency + posZ * settings.waveFrequency;
        cube.userData.baseY = posY;

        scene.add(cube);
        cubes.push(cube);

        // ======= OUTLINE: add per-cube line overlay ====================
        const edgeMat = new THREE.LineBasicMaterial({
          color: 0x006dc1,
          transparent: true,
          opacity: 0
        });
        const edgeLines = new THREE.LineSegments(
          new THREE.EdgesGeometry(geometry),
          edgeMat
        );
        edgeLines.scale.setScalar(1.01);   // moves lines 1 % off the faces
        edgeLines.renderOrder = 1;         // ensures they render after cubes
        edgeMat.depthWrite = false;        // avoids z-buffer updates                                                          // NEW
        cube.add(edgeLines);
        cube.userData.edge = edgeLines;
      }
    }
    cubesRef.current = cubes;

    // ======= AUTHORED CUBE-SCENE ENTRANCE =======
    // Pick one existing cube in the camera's central foreground, where the
    // normal distance fade still leaves the impact clearly visible.
    const findImpactCube = () => cubes.reduce((nearest, cube) => {
      const distance = Math.hypot(
        cube.position.x - IMPACT_RIPPLE.originX,
        cube.position.z - IMPACT_RIPPLE.originZ
      );
      const nearestDistance = Math.hypot(
        nearest.position.x - IMPACT_RIPPLE.originX,
        nearest.position.z - IMPACT_RIPPLE.originZ
      );
      return distance < nearestDistance ? cube : nearest;
    }, cubes[0]);
    let impactCube = findImpactCube();
    const wavelength = cellSize * IMPACT_RIPPLE.waveWavelengthCells;
    const waveLength = wavelength * IMPACT_RIPPLE.waveCycles;
    const waveDuration = waveLength / IMPACT_RIPPLE.waveSpeed;

    // A smooth tail makes both displacement and velocity reach exact zero.
    const settleEnvelope = (age, duration) => 1 - THREE.MathUtils.smoothstep(
      age,
      duration - IMPACT_RIPPLE.settleFadeDuration,
      duration
    );

    // Signed distance behind the traveling front, measured on the grid surface.
    const getWaveLag = (cube) => IMPACT_RIPPLE.waveSpeed *
      (entranceState.elapsed - IMPACT_RIPPLE.dropDuration) - cube.userData.rippleDistance;

    const getEntranceReveal = (cube) => {
      if (!shouldAnimateEntrance || entranceComplete) return 1;
      if (!entranceStarted) return 0;
      if (cube === impactCube) return 1;

      // Visibility follows the same wave arrival as displacement, then remains 1.
      return THREE.MathUtils.smoothstep(
        getWaveLag(cube),
        0,
        cellSize * IMPACT_RIPPLE.revealWidthCells
      );
    };

    const getEntranceOffset = (cube) => {
      if (!shouldAnimateEntrance || entranceComplete || !entranceStarted) return 0;

      const elapsed = entranceState.elapsed;
      if (cube === impactCube) {
        if (elapsed < IMPACT_RIPPLE.dropDuration) {
          const progress = elapsed / IMPACT_RIPPLE.dropDuration;
          return IMPACT_RIPPLE.dropHeight * (1 - progress * progress);
        }

        const age = elapsed - IMPACT_RIPPLE.dropDuration;
        if (age >= IMPACT_RIPPLE.reboundDuration) return 0;
        // Preserve downward velocity at the crossing, then undershoot/rebound
        // as an underdamped spring instead of easing directly to rest.
        return -IMPACT_PENETRATION *
          Math.sin(IMPACT_RIPPLE.reboundFrequency * age) *
          Math.exp(-IMPACT_RIPPLE.reboundDamping * age) *
          settleEnvelope(age, IMPACT_RIPPLE.reboundDuration);
      }

      const distance = cube.userData.rippleDistance;
      const lag = getWaveLag(cube);
      if (lag <= 0 || lag >= waveLength) return 0;
      const age = lag / IMPACT_RIPPLE.waveSpeed;

      // One radial response: the inner cells compress first, while the outgoing
      // ring has a leading crest, trough, and smaller recovery. Soft arrival
      // keeps displacement/velocity continuous even through the center phase shift.
      const centerWeight = cube.userData.rippleCenterWeight;
      const phase = 2 * Math.PI * lag / wavelength - centerWeight * Math.PI;
      const amplitude = cellSize * THREE.MathUtils.lerp(
        IMPACT_RIPPLE.waveAmplitudeCells,
        IMPACT_RIPPLE.centerDepressionCells,
        centerWeight
      );
      return amplitude / (1 + distance * IMPACT_RIPPLE.waveRadialAttenuation) *
        Math.sin(phase) * THREE.MathUtils.smoothstep(lag, 0, cellSize * IMPACT_RIPPLE.arrivalWidthCells) *
        Math.exp(-IMPACT_RIPPLE.waveTemporalDamping * age) *
        settleEnvelope(age, waveDuration);
    };

    const applyCubeEntranceTransform = (cube) => {
      cube.position.y = cube.userData.baseY + getEntranceOffset(cube);
      cube.scale.set(
        cubeScaleRef.current.x,
        cubeScaleRef.current.y,
        cubeScaleRef.current.z
      );
    };

    const startSceneEntrance = () => {
      if (entranceStarted || prefersReducedMotion) return;

      entranceStarted = true;
      entranceState.startedAt = performance.now();
      // Travel already ran behind the preloader: choose the focal cube now.
      impactCube = findImpactCube();

      // Capture surface-local distances once, independent of subsequent travel.
      // Z repeats over the production grid span: the shortest periodic delta
      // gives wrapped rows the same phase as their adjacent surface cells.
      // No screen-space origin tracking or alternate reset path is needed.
      let maxDistance = 0;
      cubes.forEach((cube) => {
        const deltaZ = cube.position.z - impactCube.position.z;
        const localDeltaZ = deltaZ - Math.round(deltaZ / gridSpanZ) * gridSpanZ;
        const distance = Math.hypot(
          cube.position.x - impactCube.position.x,
          localDeltaZ
        );
        cube.userData.rippleDistance = distance;
        cube.userData.rippleCenterWeight = 1 - THREE.MathUtils.smoothstep(
          distance,
          cellSize,
          cellSize * IMPACT_RIPPLE.centerRadiusCells
        );
        maxDistance = Math.max(maxDistance, distance);
      });

      // Include even invisible edge cubes. Completion only releases temporary
      // entrance state/interaction suppression; travel and wrapping never wait.
      entranceState.settleAt = IMPACT_RIPPLE.dropDuration + Math.max(
        IMPACT_RIPPLE.reboundDuration,
        maxDistance / IMPACT_RIPPLE.waveSpeed + Math.max(
          waveDuration,
          cellSize * IMPACT_RIPPLE.revealWidthCells / IMPACT_RIPPLE.waveSpeed
        )
      );
    };

    sceneEntranceRef.current = startSceneEntrance;

    // ======= CUBE POINTER INTERACTION =======
    // Listen at the window level because the Three.js canvas sits behind the UI.
    // Raycasting still uses the scene bounds, so normal page controls keep working.
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let lastHoveredCube = null;

    const triggerCubeGlow = (cube) => {
      cube.userData.glowTimeline?.kill();

      const glowTimeline = gsap.timeline();
      glowTimeline
        .to(cube.material, {
          emissiveIntensity: 2.5,
          duration: 0.08,
          ease: 'power2.out'
        })
        .to(cube.material, {
          emissiveIntensity: 0,
          duration: 4.0,
          ease: 'power2.out'
        });

      cube.userData.glowTimeline = glowTimeline;
    };

    const handlePointerMove = (event) => {
      if (
        prefersReducedMotion ||
        !entranceComplete ||
        event.pointerType === 'touch'
      ) return;

      const bounds = mount.getBoundingClientRect();
      const isInsideScene =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      if (!isInsideScene) {
        lastHoveredCube = null;
        return;
      }

      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      scene.updateMatrixWorld(true);
      raycaster.setFromCamera(pointer, camera);

      const intersections = raycaster.intersectObjects(cubesRef.current, false);
      const hoveredCube = intersections[0]?.object || null;

      if (hoveredCube && hoveredCube !== lastHoveredCube) {
        triggerCubeGlow(hoveredCube);
      }

      lastHoveredCube = hoveredCube;
    };

    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    // ======= ANIMATION LOOP =======
    const calculateOpacity = (objPos) => {
      const distance = camera.position.distanceTo(objPos);
      if (distance > fadeStart) return 0;
      if (distance < fadeEnd) return 1;
      const t = (fadeStart - distance) / (fadeStart - fadeEnd);
      return Math.pow(t, fadeCurve);
    };

    const getResetZPosition = (currentZ) => currentZ - gridSpanZ;

    const renderScene = () => {
      speedRef.current = speedTarget.current.value;
      cubeScaleRef.current.x = scaleTarget.current.x;
      cubeScaleRef.current.y = scaleTarget.current.y;
      cubeScaleRef.current.z = scaleTarget.current.z;

      trails.forEach((trail) => {
        if (prefersReducedMotion) trail.material.opacity = 0;
      });

      cubesRef.current.forEach((cube) => {
        applyCubeEntranceTransform(cube);
        cube.material.opacity = calculateOpacity(cube.position) * getEntranceReveal(cube);
        cube.material.needsUpdate = true;
        if (cube.userData.edge) {
          cube.userData.edge.material.opacity =
            cube.material.opacity * outlineToggleRef.current.value;
        }
      });

      renderer.render(scene, camera);
    };
    renderSceneRef.current = renderScene;

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (entranceStarted && !entranceComplete) {
        entranceState.elapsed = (performance.now() - entranceState.startedAt) / 1000;
        entranceComplete = entranceState.elapsed >= entranceState.settleAt;
      }

      speedRef.current = speedTarget.current.value;

      cubeScaleRef.current.x = scaleTarget.current.x;
      cubeScaleRef.current.y = scaleTarget.current.y;
      cubeScaleRef.current.z = scaleTarget.current.z;

      if (settings.waveEffectEnabled) {
        waveTimeRef.current += settings.waveSpeed;
      }

      trails.forEach(trail => {
        const speed = baseParticleSpeed * (speedRef.current / defaultSpeed);
        trail.position.z += speed;
        trail.scale.y = 0.1 + speed * 5;

        const fade = calculateOpacity(trail.position);
        trail.material.opacity = fade * 0.8;

        if (trail.position.z > trailResetZ) {
          const overshoot = trail.position.z - trailResetZ;
          resetTrail(trail, null, overshoot);
        }
      });

      cubesRef.current.forEach(cube => {
        cube.position.z += speedRef.current;

        if (settings.waveEffectEnabled) {
          cube.userData.baseY =
            settings.waveAmplitude *
            Math.sin(cube.userData.phase + waveTimeRef.current);
        }

        applyCubeEntranceTransform(cube);

        if (cube.material.transparent) {
          const opacity = calculateOpacity(cube.position) * getEntranceReveal(cube);
          if (cube.material.opacity !== opacity) {
            cube.material.opacity = opacity;
            cube.material.needsUpdate = true;
          }
        }

        // ======= OUTLINE: keep opacity in sync ========================
        if (cube.userData.edge) {
          cube.userData.edge.material.opacity =
            cube.material.opacity * outlineToggleRef.current.value;
        }


        if (cube.position.z > startZ) {
          cube.material.opacity = 0;
          cube.material.emissiveIntensity = 0;
          cube.material.needsUpdate = true;
          cube.userData.glowTimeline?.kill();
          cube.userData.glowTimeline = null;

          if (cube.userData.edge) {
            cube.userData.edge.material.opacity = 0;
          }

          cube.position.z = getResetZPosition(cube.position.z);

          if (settings.randomYEffectEnabled && !settings.waveEffectEnabled) {
            const range = settings.randomYRange || 10;
            cube.userData.baseY = (Math.random() - 0.5) * range;
          } else if (settings.waveEffectEnabled) {
            cube.userData.baseY =
              settings.waveAmplitude *
              Math.sin(cube.userData.phase + waveTimeRef.current);
          }
          applyCubeEntranceTransform(cube);
        }
      });

      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      renderScene();
    } else {
      animate();
    }

    // ======= HANDLE RESIZE =======
    let resizeTimeout;
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (prefersReducedMotion) renderScene();
    };
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    });
    resizeObserver.observe(mount);

    // ======= CLEANUP =======
    return () => {
      if (animationId !== undefined) cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', handlePointerMove);
      cubesRef.current.forEach((cube) => cube.userData.glowTimeline?.kill());
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
      if (renderSceneRef.current === renderScene) renderSceneRef.current = null;
      if (sceneEntranceRef.current === startSceneEntrance) {
        sceneEntranceRef.current = null;
      }

      scene.traverse((object) => {
        object.geometry?.dispose();
        if (!object.material) return;
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      });

      cubesRef.current = [];
      scene.clear();
      renderer.renderLists.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [prefersReducedMotion]);

  // The initial preloader is the handoff point for the authored scene entrance.
  // Returning to Home later shows the already-established world immediately.
  useEffect(() => {
    if (!isPreloaderVisible) {
      sceneEntranceRef.current?.();
    }
  }, [isPreloaderVisible]);

  return <div ref={mountRef} className="three-scene" aria-hidden="true" />;
};

export default ThreeSceneManager;
