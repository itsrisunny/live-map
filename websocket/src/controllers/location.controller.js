const locationService = require("../services/location.service");

const handleLocationUpdate = (data) => {
  if (
    typeof data.lat === "number" &&
    typeof data.lng === "number"
  ) {
    locationService.setLocation(data);
    return data;
  }
  return null;
};

module.exports = {
  handleLocationUpdate,
};
