// Lift is in production world units; radius and propagation distance use cells.
export const CUBE_LIFT_DEFAULTS = Object.freeze({
  maxLift: 14.2,
  effectRadius: 3.35,
  falloffStrength: 0.42,
  riseDuration: 0.62,
  sequenceDuration: 4.8,
  propagationDelay: 0.075,
  accentStrength: 0.27
});

function temporalEnvelope(age, settings) {
  if (age < 0 || age >= settings.sequenceDuration) return 0;
  if (age < settings.riseDuration) {
    return 1 - Math.pow(1 - age / settings.riseDuration, 3);
  }
  const t = (age - settings.riseDuration) /
    (settings.sequenceDuration - settings.riseDuration);
  return 1 - t * t * t * (t * (t * 6 - 15) + 10);
}

export function createCubeLiftField(cubes, cellSize) {
  const sources = new Map();
  const responseSums = new Float64Array(cubes.length);
  let radius;
  let falloff;

  // Discover neighbors only on entry or spatial tuning, not every frame.
  // Physical X/Z distance deliberately does not connect opposite wrap edges.
  const findNeighbors = (origin, settings) => {
    const neighbors = [];
    for (let index = 0; index < cubes.length; index++) {
      const cube = cubes[index];
      const distance = Math.hypot(
        cube.position.x - origin.position.x,
        cube.position.z - origin.position.z
      ) / cellSize;
      if (distance > settings.effectRadius) continue;
      neighbors.push({
        index,
        distance,
        strength: Math.exp(-distance * distance * settings.falloffStrength)
      });
    }
    return neighbors;
  };

  for (const cube of cubes) cube.userData.interactionLift = 0;

  return {
    enter(cube, time, settings) {
      const existing = sources.get(cube);
      const lifetime = settings.sequenceDuration + settings.effectRadius * settings.propagationDelay;
      if (existing && time - existing.startedAt < lifetime) return;
      sources.set(cube, { startedAt: time, neighbors: findNeighbors(cube, settings) });
    },
    update(time, settings) {
      responseSums.fill(0);
      const spatialChanged = radius !== settings.effectRadius || falloff !== settings.falloffStrength;
      radius = settings.effectRadius;
      falloff = settings.falloffStrength;
      const lifetime = settings.sequenceDuration + radius * settings.propagationDelay;
      for (const [origin, source] of sources) {
        const age = time - source.startedAt;
        if (age >= lifetime) {
          sources.delete(origin);
          continue;
        }
        if (spatialChanged) source.neighbors = findNeighbors(origin, settings);
        for (const neighbor of source.neighbors) {
          responseSums[neighbor.index] += neighbor.strength * temporalEnvelope(
            age - neighbor.distance * settings.propagationDelay,
            settings
          );
        }
      }
      for (let index = 0; index < cubes.length; index++) {
        const response = 1 - Math.exp(-responseSums[index]);
        cubes[index].userData.interactionLift = response * settings.maxLift;
        cubes[index].material.emissiveIntensity = response * settings.accentStrength;
      }
    },
    forget(cube) {
      // Recycling clears both source ownership and receipt of older fields.
      sources.delete(cube);
      const index = cubes.indexOf(cube);
      for (const source of sources.values()) {
        for (let i = source.neighbors.length - 1; i >= 0; i--) {
          if (source.neighbors[i].index === index) source.neighbors.splice(i, 1);
        }
      }
      cube.userData.interactionLift = 0;
      cube.material.emissiveIntensity = 0;
    },
    dispose() {
      sources.clear();
      responseSums.fill(0);
      for (const cube of cubes) {
        cube.userData.interactionLift = 0;
        cube.material.emissiveIntensity = 0;
      }
    }
  };
}
