let latestLocation = null;

const setLocation = (location) => {
  latestLocation = location;
};

const getLocation = () => latestLocation;

module.exports = {
  setLocation,
  getLocation,
};
