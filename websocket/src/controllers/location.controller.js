const locationService = require("../services/location.service");

/**
 * Subscribe client to ride
 * Returns full ride data if exists
 */
const subscribeToRide = async (rideId, env) => {
  try {
    if (!rideId) return null;
    const ride = await locationService.getRideById(rideId, env);

    if (!ride) return null;

    return ride;
  } catch (error) {
    console.error("Error in subscribeToRide:", error);
    return null;
  }
};

/**
 * Handle driver location update
 */
const handleLocationUpdate = async (rideId, data, env) => {
  try {
    if (!rideId) return null;

    if (
      typeof data.lat === "number" &&
      typeof data.lng === "number"
    ) {
      const updatedLocation =
        await locationService.setLocation(rideId, data, env);

      return updatedLocation;
    }

    return null;
  } catch (error) {
    console.error("Error in handleLocationUpdate:", error);
    return null;
  }
};

/**
 * Handle ride status update
 * Status codes:
 * -1 = Cancelled
 *  0 = Accepted
 *  1 = Started
 *  2 = Completed
 */
const handleStatusUpdate = async (rideId, status, env) => {
  try {
    if (!rideId) return null;

    if (typeof status !== "number") return null;

    // Optional: validate allowed status values
    const allowedStatuses = [-1, 0, 1, 2];
    if (!allowedStatuses.includes(status)) return null;

    const updatedStatus =
      await locationService.updateRideStatus(rideId, status, env);

    return updatedStatus;
  } catch (error) {
    console.error("Error in handleStatusUpdate:", error);
    return null;
  }
};

module.exports = {
  subscribeToRide,
  handleLocationUpdate,
  handleStatusUpdate,
};
