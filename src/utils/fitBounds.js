import mapboxgl from "mapbox-gl";

export const getBoundsFromPoints = (points = []) => {
  if (!Array.isArray(points) || points.length === 0) {
    return null;
  }

  const bounds = new mapboxgl.LngLatBounds();

  let hasValidPoint = false;

  points.forEach((p) => {
    if (
      p &&
      typeof p.lat === "number" &&
      typeof p.lng === "number" &&
      p.lat >= -90 &&
      p.lat <= 90 &&
      p.lng >= -180 &&
      p.lng <= 180
    ) {
      bounds.extend([p.lng, p.lat]); // [lng, lat]
      hasValidPoint = true;
    }
  });

  return hasValidPoint ? bounds : null;
};
