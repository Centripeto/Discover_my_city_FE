import { useCallback, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { getPois } from "../../api/poi";

const mapPoi = (poi) => ({
  longitude: poi.coordinate?.longitude,
  latitude: poi.coordinate?.latitude,
  id: poi.id,
  name: poi.name,
  description: poi.description,
  displayName: poi.name,
  status: poi.status,
  creator: poi.creator
});

const usePoiList = ({ pageNumber, pageSize }) => {
  const [pois, setPois] = useState({
    list: [],
    pageNumber,
    pageSize,
    totalPages: 0,
    totalSize: 0,
  });
  const { accessToken } = useAuth();

  const fetch = useCallback(
    (search) => {
      getPois(accessToken, {
        pageSize: search.pageSize,
        pageNumber: search.pageNumber,
        status: search.status,
      }).then((response) => {
        setPois({ ...response, list: response.list.map(mapPoi) });
      });
    },
    [accessToken]
  );

  return { pois, fetch };
};

export default usePoiList;
