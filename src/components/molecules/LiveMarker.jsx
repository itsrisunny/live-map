import MapMarker from "../atoms/MapMarker";

const LiveMarker = ({ location }) => {
  if (!location) return null;
  return <MapMarker lat={location.lat} lng={location.lng} color="blue" />;
};

export default LiveMarker;
