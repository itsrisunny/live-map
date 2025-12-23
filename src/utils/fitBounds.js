import mapboxgl from "mapbox-gl";

export const getBoundsFromPoints = (points) => {
  const bounds = new mapboxgl.LngLatBounds();

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
      // 🔑 IMPORTANT: [lng, lat] ORDER
      bounds.extend([p.lng, p.lat]);
    }
  });

  return bounds;
};
