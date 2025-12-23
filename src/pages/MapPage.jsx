import { useSearchParams } from "react-router-dom";
import TrackingMap from "../components/organisms/TrackingMap";
import { getLocationFromUrl } from "../utils/urlParams";

const MapPage = () => {
  const [params] = useSearchParams();
  const { pickup, drop } = getLocationFromUrl(params);

  return <TrackingMap pickup={pickup} drop={drop} />;
};

export default MapPage;
