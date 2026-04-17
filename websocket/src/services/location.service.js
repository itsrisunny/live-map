const { db, admin } = require("../config/firebase");

let latestLocation = null;

/**
 * Get rides collection dynamically based on environment
 * Example:
 *  dev_env  → /dev_env/dev_env/rides
 *  prod_env → /prod_env/prod_env/rides
 */
const getRideCollection = (env) => {
  if (!env) {
    throw new Error("Environment is required");
  }

  return db
    .collection(env)
    .doc(env)
    .collection("rides");
};

/**
 * Update driver live location
 */
const setLocation = async (rideId, location, env) => {
  try {
    if (!rideId || !env) return null;

    latestLocation = location;

    /*const geoPoint = new admin.firestore.GeoPoint(
      location.lat,
      location.lng
    );

    await getRideCollection(env)
      .doc(rideId)
      .update({
        driverCurrentLocation: geoPoint,
        updatedAt: new Date(),
      });*/

    return location;
  } catch (error) {
    console.error("Error in setLocation:", error);
    return null;
  }
};

/**
 * Update ride status
 * -1 = Cancelled
 *  0 = Accepted
 *  1 = Started
 *  2 = Completed
 */
const updateRideStatus = async (rideId, status, env) => {
  try {
    if (!rideId || !env) return null;

    /*await getRideCollection(env)
      .doc(rideId)
      .update({
        rideStatus: status,
        updatedAt: new Date(),
      });*/

    return { rideStatus: status };
  } catch (error) {
    console.error("Error in updateRideStatus:", error);
    return null;
  }
};

/**
 * Get ride by ID
 */
const getRideById = async (rideId, env) => {
  try {
    if (!rideId || !env) return null;

    const rideDoc = await getRideCollection(env)
      .doc(rideId)
      .get();

    if (!rideDoc.exists) {
      return null;
    }

    return rideDoc.data();
  } catch (error) {
    console.error("Error in getRideById:", error);
    return null;
  }
};

/**
 * Optional: in-memory last location (fallback)
 */
const getLocation = () => latestLocation;

module.exports = {
  setLocation,
  updateRideStatus,
  getRideById,
  getLocation,
};
