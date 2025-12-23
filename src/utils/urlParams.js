export const getLocationFromUrl = (params) => {
  const pickupLat = Number(params.get("pickupLat"));
  const pickupLng = Number(params.get("pickupLng"));
  const dropLat = Number(params.get("dropLat"));
  const dropLng = Number(params.get("dropLng"));

  // Validation
  if (
    isNaN(pickupLat) ||
    isNaN(pickupLng) ||
    isNaN(dropLat) ||
    isNaN(dropLng)
  ) {
    console.error("Invalid coordinates from URL");
    return {};
  }

  return {
    pickup: { lat: pickupLat, lng: pickupLng },
    drop: { lat: dropLat, lng: dropLng },
  };
};
