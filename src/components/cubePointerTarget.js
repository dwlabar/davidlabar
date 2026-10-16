import { Box3, Matrix4, Ray, Vector3 } from 'three';

// Experimental X/Z footprint only; the rendered unit-box geometry stays intact.
export const CUBE_POINTER_FOOTPRINT_MULTIPLIER = 1.5;

const isEligible = (cube, minimumOpacity) => cube.visible && cube.material.opacity > minimumOpacity;

// Keep the established direct/expanded priority for clearly visible cubes.
// Faint visible targets are fallback only, so they cannot steal clearer hits.
export function findCubePointerTarget(raycaster, cubes, intersections, findExpandedTarget) {
  for (const minimumOpacity of [0.05, 0]) {
    const hit = intersections.find(({ object }) => isEligible(object, minimumOpacity));
    if (hit) return hit.object;
    const expanded = findExpandedTarget(raycaster, cubes, minimumOpacity);
    if (expanded) return expanded;
  }
  return null;
}

export function createCubePointerTarget() {
  const halfFootprint = CUBE_POINTER_FOOTPRINT_MULTIPLIER / 2;
  const bounds = new Box3(
    new Vector3(-halfFootprint, -0.5, -halfFootprint),
    new Vector3(halfFootprint, 0.5, halfFootprint)
  );
  const inverseMatrix = new Matrix4();
  const localRay = new Ray();
  const hitPoint = new Vector3();

  // Scene-owned scratch math only: no meshes, listeners, or GPU resources.
  // Use after a geometry miss within the same visibility tier.
  return (raycaster, cubes, minimumOpacity = 0) => {
    let nearestCube = null;
    let nearestDistance = Infinity;
    for (const cube of cubes) {
      if (!isEligible(cube, minimumOpacity)) continue;
      inverseMatrix.copy(cube.matrixWorld).invert();
      localRay.copy(raycaster.ray).applyMatrix4(inverseMatrix);
      if (!localRay.intersectBox(bounds, hitPoint)) continue;
      hitPoint.applyMatrix4(cube.matrixWorld);
      const distance = raycaster.ray.origin.distanceTo(hitPoint);
      if (distance < raycaster.near || distance > raycaster.far) continue;
      // Strict comparison keeps cube iteration order as the stable tie-breaker.
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestCube = cube;
      }
    }
    return nearestCube;
  };
}
