import { useEffect, useState } from "react";

const useRoute = (pickup, drop) => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (!pickup || !drop) return;

    const fetchRoute = async () => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/` +
        `${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}` +
        `?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.routes?.length) {
        setRoute(data.routes[0].geometry);
      }
    };

    fetchRoute();
  }, [pickup, drop]);

  return route;
};

export default useRoute;
